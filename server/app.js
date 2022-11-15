import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import sessions from 'express-session'

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

app.use('/', async (req, res, next) => {
  console.log("hello")
  res.json({"hello": "wassup"})
})

app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})