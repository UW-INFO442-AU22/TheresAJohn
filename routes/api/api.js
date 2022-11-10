import express from 'express'
let router = express.Router()

import postsRouter from './controllers/posts.js'

router.use('/posts', postsRouter)

export default router