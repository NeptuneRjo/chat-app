import express, { urlencoded } from 'express'
import cors from 'cors'
import session from 'express-session'
import expressWs from 'express-ws'
import passport from 'passport'
import './config/mongoConfig'
import 'dotenv/config'
import { connection } from 'mongoose'

const app = express()
const port = process.env.PORT || 4000

/* <-- Middleware --> */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* <-- Routes --> */

/* <-- Server --> */
connection.on('connected', () => {
	app.listen(port, () => {
		console.log('Connected to DB and listening on port:', port)
	})
})
