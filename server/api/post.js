import express from 'express'
import moment from 'moment-timezone'
import getMetaTags from './utils/metaTag.js';

let router = express.Router()

/**
 * Lists out all posts
 */
router.get('/', async (req, res) => {
  let email = req.body.email
  let allPosts
  try {
    if (!email) { // list out all posts
      allPosts = await req.models.Post.find()
    } else { // list out posts for current user
      allPosts = await req.models.Post.find().where('email').in(email).exec()
    }
    let result = await Promise.all(
      allPosts.map(async (post) => {
        try {
          let metaTags = await getMetaTags(post.schoolLink)
          let convertTime = moment(post.datePosted).tz("America/Los_Angeles").format("MMM D, YYYY h:mm A z")
          return {"id": post._id, "personOfContact": post.personOfContact, "contactEmail": post.contactEmail,
                  "schoolLink": post.schoolLink, "schoolName": metaTags[0], "schoolImage": metaTags[1],
                  "schoolVideo": metaTags[2], "resource": post.resource, "quantity": post.quantity,
                  "quantityDonated": post.quantityDonated, "description": post.description,
                  "completed": post.completed, "datePosted": convertTime
                }
        } catch (e) {
          return e.message
        }
      })
    )
    return res.json(result)
  } catch (e) {
    res.status(500).json({ status: "error", error: e })
  }
})

router.post('/', async (req, res) => {
  const { link, resource, quantity, description } = req.body
  if (!(resource && quantity && description && link)) {
    return res.status(400).send("All inputs are required")
  }
  if (req.session.isAuthenticated) {
    try {
      const newPost = new req.models.Post({
        contactEmail: req.session.account.email,
        personOfContact: req.session.account.fullName,
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
  } else {
    res.status(401).json({"status": "error", "error": "not logged in"})
  }
})


router.patch('/complete', async (req, res) => {
  const postId = req.body.postID
  if (!(postId)) {
    return res.status(400).send("All inputs are required")
  }
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
  const quantity = req.body.quantit
  const description = req.body.description
  const personOfContact = req.body.contact
  const schoolLink = req.body.link
  const postId = req.body.postID
  if (!(postId)) {
    return res.status(400).send("All inputs are required")
  }
  try {
    let post = await req.models.Post.findById(postId)
    if (resource) {
      post.resource = resource
    }
    if (quantity) {
      post.quantity = quantity
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