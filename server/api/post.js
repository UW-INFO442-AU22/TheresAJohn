import express from 'express'
let router = express.Router()

router.get('/', async (req, res, next) => {
  res.send("You've reached posts")
})

router.post('/', async (req, res) => {
  const { resource, quantity, deadline, description } = req.body
  if (!(resource && quantity && deadline && description)) {
    return res.status(400).send("All inputs are required")
  }

  // if (!req.session.isAuthenticated) { // user not logged in
  //   console.log("Unauthorized: not logged in")
  //   return res.status(401).json({ status: 'error', error: "not logged in" })
  // }
  try {
    const newPost = new req.models.Post({
      resource: resource,
      quantity: quantity,
      deadline: deadline,
      description: description,
      datePosted: Date.now()
    })
    await newPost.save()
    res.json({ "status": "success" })
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
    console.log(post)
    post.completed = true
    await post.save()
    res.json({ "status": "success" })
  } catch (e) {
    res.status(500).json({ status: "error", error: e })
  }
})

router.patch('/', async (req, res) => {
  const resource = req.body.resource
  const quantity = req.body.quantity
  const deadline = req.body.deadline
  const description = req.body.description
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
    await post.save()
    res.json({ "status": "success" })
  } catch (e) {
    res.status(500).json({ status: "error", error: e })
  }
})

export default router