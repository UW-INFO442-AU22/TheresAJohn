import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import models from "./models.js"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import indexRouter from './routes/index.js'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    req.models = models
    next()
})

app.use('/', indexRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

export default app