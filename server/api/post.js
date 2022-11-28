import express from 'express'
import moment from 'moment-timezone'
let router = express.Router()

/**
 * Lists out all posts
 */
router.get('/', async (req, res) => {
  try {
    let allPosts = await req.models.Post.find()
    let result = allPosts.map((item) => {
      let copyObj = {}
      Object.keys(item._doc).forEach((key) => {
        if (key === "datePosted") {
          let convertTime = moment(item.datePosted).tz("America/Los_Angeles").format("MMM D, YYYY h:mm A z")
          copyObj[key] = convertTime
        } else {
          copyObj[key] = item._doc[key]
        }
      })
      return copyObj
    })
    return res.json(result)
  } catch (e) {
    res.status(500).json({ status: "error", error: e })
  }
})

router.post('/', async (req, res) => {
  const { contact, link, resource, quantity, deadline, description } = req.body
  if (!(resource && quantity && deadline && description && contact && link)) {
    return res.status(400).send("All inputs are required")
  }

  // if (!req.session.isAuthenticated) { // user not logged in
  //   console.log("Unauthorized: not logged in")
  //   return res.status(401).json({ status: 'error', error: "not logged in" })
  // }
  try {
    const newPost = new req.models.Post({
      personOfContact: contact,
      schoolLink: link,
      resource: resource,
      quantity: quantity,
      description: description,
      datePosted: Date.now()
    })
    await newPost.save()
    res.json({ status: "success" })
  } catch (e) {
    res.status(500).json({ status: "error", error: e })
  }
})


router.patch('/complete', async (req, res) => {
  const postId = req.body.postID
  if (!(postId)) {
    return res.status(400).send("All inputs are required")
  }

  // if (!req.session.isAuthenticated) { // user not logged in
  //   console.log("Unauthorized: not logged in")
  //   return res.status(401).json({ status: 'error', error: "not logged in" })
  // }
  try {
    let post = await req.models.Post.findById(postId)
    post.completed = true
    await post.save()
    res.json({ status: "success" })
  } catch (e) {
    res.status(500).json({ status: "error", error: e })
  }
})

router.patch('/', async (req, res) => {
  const resource = req.body.resource
  const quantity = req.body.quantity
  const deadline = req.body.deadline
  const description = req.body.description
  const personOfContact = req.body.contact
  const schoolLink = req.body.link
  const postId = req.body.postID
  if (!(postId)) {
    return res.status(400).send("All inputs are required")
  }
  // if (!req.session.isAuthenticated) { // user not logged in
  //   console.log("Unauthorized: not logged in")
  //   return res.status(401).json({ status: 'error', error: "not logged in" })
  // }
  try {
    let post = await req.models.Post.findById(postId)
    if (resource) {
      post.resource = resource
    }
    if (quantity) {
      post.quantity = quantity
    }
    if (deadline) {
      post.deadline = deadline
    }
    if (description) {
      post.description = description
    }
    if (personOfContact) {
      post.personOfContact = personOfContact
    }
    if (schoolLink) {
      post.schoolLink = schoolLink
    }
    await post.save()
    res.json({ status: "success" })
  } catch (e) {
    res.status(500).json({ status: "error", error: e })
  }
})

export default router