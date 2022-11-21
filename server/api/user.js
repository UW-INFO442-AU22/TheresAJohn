import express from 'express'
let router = express.Router()

router.get('/', async (req, res) => {
    try {
        // return user info
        let email = req.query.email.toLowerCase()
        let user = await req.models.User.findOne({ email: email })

        res.json({
            _id: user._id, 
            firstName: user.firstName, 
            lastName: user.lastName, 
            email: user.email, 
            schoolName: user.schoolName, 
            schoolAddress: user.schoolAddress
        })
    } catch(e) {
        res.status(500).json({ status: "error", error: e })
    }
})

router.patch('/update', async (req, res) => {
    let session = req.session
    try {
        let email = req.body.email.toLowerCase()
        console.log(session.account.email)
        if (!session.isAuthenticated || (session.account.email != email)) {
            return res.status(401).json({ status: "error", error: "not logged in" })
        }
        // ability to change first name, last name, school name and school address
        let user = await req.models.User.findOne({ email: email })
        if (req.body.schoolName) {
            user.schoolName = req.body.schoolName
        }
        if (req.body.schoolAddress) {
            user.schoolAddress = req.body.schoolAddress
        }
        if (req.body.firstName) {
            user.firstName = req.body.firstName
        }
        if (req.body.lastName) {
            user.lastName = req.body.lastName
        }

        await user.save()
        res.json({ "status": "success" })
    } catch(e) {
        res.status(500).json({ status: "error", error: e })
    }
})

export default router