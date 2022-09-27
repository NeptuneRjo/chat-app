import express, { urlencoded } from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import { Server } from 'socket.io'
import { connection } from 'mongoose'
import { createServer } from 'http'
import { authRoutes, chatRoutes } from './routes'

import './config/mongoConfig'
import 'dotenv/config'
import './config/passport'

const app = express()
const port = process.env.PORT || 4000
const httpServer = createServer(app)
const io = new Server(httpServer, {})

/* <-- Middleware --> */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
	session({
		secret: process.env.EXPRESS_SESSION_SECRET as string,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
)
app.use(passport.initialize())
app.use(passport.session())

/* <-- Routes --> */
app.use('/auth', authRoutes)
app.use('/chat', chatRoutes)

/* <-- Server --> */
connection.on('connected', () => {
	httpServer.listen(port, () => {
		console.log('Connect to DB and listening on port:', port)
	})
})

/* Web Sockets */
io.on('connection', (socket) => {
	console.log('Made socket connection', socket.id)
})

io.engine.on('connection_error', (err: any | unknown) => {
	const { req, code, message, context } = err

	console.log(req)
	console.log(code)
	console.log(message)
	console.log(context)
})
