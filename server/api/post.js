import express from 'express'
let router = express.Router()

router.get('/', async (req, res, next) => {
    res.send("You've reached posts")
})

router.post('/', async (req, res, next) => {
    
})

export default router