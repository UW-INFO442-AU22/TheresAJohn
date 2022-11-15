import express from 'express'
let router = express.Router()

import usersRouter from './api/user.js'
import postsRouter from './api/post.js'

router.use('/users', usersRouter)
router.use('/posts', postsRouter)

export default router