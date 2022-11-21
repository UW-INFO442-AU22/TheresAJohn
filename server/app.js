import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import sessions from 'express-session'
import bcrypt from 'bcrypt'

import models from "./db/models.js"
import apiRouter from './api.js'

const PORT = process.env.PORT || 3001

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

app.use('/api', apiRouter)

app.get('/', (req, res) => {
  if (req.session.isAuthenticated) {
    return res.send("Hi " + req.session.account.firstName)
  }
  return res.send('Welcome!')
})

app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    if (!(email && password && firstName && lastName)) {
      return res.status(400).send("All inputs are required")
    }

    if (await req.models.User.findOne({ email: email })) {
      return res.status(409).send("User already exist, please login")
    }

    let encryptedPassword = await bcrypt.hash(password, 10)

    const newUser = new req.models.User({
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      password: encryptedPassword
    })

    await newUser.save()

    return res.status(201).json({ status: 'success' })
  } catch {
    return res.status(500).json({ status: 'error', error: "unsuccessful creating account, please try again later" })
  }
})

app.get('/signin', async (req, res) => {
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
      session.account.firstName = user.firstName
      session.account.lastName = user.lastName
      session.account.schoolName = user.schoolName
      session.account.schoolAddress = user.schoolAddress
      return res.status(200).json({ status: "success" })
    }
  } catch {
    return res.status(500).json({ status: 'error', error: "invalid credentials" })
  }
})

app.get('/signout', async (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.get('/error', (req, res) => res.status(500).send('server error'))

app.get('/unauthorized', (req, res) => res.status(401).send('Permission denied'))

app.delete('/', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}: https://localhost:${PORT}`)
})