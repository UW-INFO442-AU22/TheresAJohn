import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import sessions from 'express-session'
import bcrypt from 'bcrypt'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import models from "./db/models.js"
import apiRouter from './api.js'

const PORT = process.env.PORT || 8080

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
const oneDay = 1000 * 60 * 60 * 24

app.use(sessions({
  secret: "this is my secret key sdjfalkdjfdlsf",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}))

app.use((req, res, next) => {
  req.models = models
  next()
})

app.use(express.static(path.resolve(__dirname, "../client/build")))

app.use('/api', apiRouter)

app.post('/register', async (req, res) => {
  try {
    const { fullName, schoolName, email, password } = req.body
    console.log(fullName, schoolName, email, password)
    if (!(email && password && fullName && schoolName)) {
      return res.status(400).send("All inputs are required")
    }

    if (await req.models.User.findOne({ email: email })) {
      return res.status(409).send("User already exist, please login")
    }

    let encryptedPassword = await bcrypt.hash(password, 10)

    const newUser = new req.models.User({
      fullName: fullName, 
      schoolName: schoolName,
      email: email.toLowerCase(),
      password: encryptedPassword
    })

    await newUser.save()

    return res.json({ status: 'success' })
  } catch {
    return res.status(500).json({ status: 'error', error: "unsuccessful creating account, please try again later" })
  }
})

app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      return res.status(400).send("All inputs are required")
    }

    const user = await models.User.findOne({ email: email.toLowerCase() })

    if (user && (await bcrypt.compare(password, user.password))) {
      let session = req.session
      session.isAuthenticated = true
      if (!session.account) {
        session.account = {}
      }
      session.account.userid = user._id
      session.account.email = user.email
      session.account.fullName = user.fullName
      session.account.schoolName = user.schoolName
      return res.json({ status: "success", userInfo: session.account })
    }
  } catch {
    return res.status(500).json({ status: 'error', error: "invalid credentials" })
  }
})

app.get('/signout', async (req, res) => {
  req.session.destroy()
})

app.get('/error', (req, res) => res.status(500).json({ status: 'error', error: "Server Error" }))

app.get('/unauthorized', (req, res) => res.status(401).json({ status: 'error', error: "Permission Denied" }))

app.delete('/delete', async (req, res) => {
  let session = req.session
  if (!session.isAuthenticated) {
      console.log("Unauthorized: not logged in")
      return res.status(401).json({ status: 'error', error: "not logged in" })
  }
  try {
    const userToDelete = await req.models.User.findById(req.body.userid)
    if (userToDelete.email != session.account.email) {
      return res.status(400).json({ status: 'error', eror: 'requested account does not match our record'})
    }
    await req.models.Post.deleteMany({ userID: req.body.userid })
    await req.models.User.deleteOne({ _id: req.body.userid })
    return res.json({ status: 'success' })
  } catch {
    return res.status(500).json({ status: 'error', error: "cannot complete this action right now, please try again" })
  }
})

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}: https://localhost:${PORT}`)
})