import express from 'express'
import cors from 'cors'
import passport from 'passport'
import { Server } from 'socket.io'
import { connection } from 'mongoose'
import { createServer } from 'http'
import { authRoutes, chatRoutes } from './routes'
import session from 'express-session'

import './config/mongoConfig'
import 'dotenv/config'
import './config/passport'

const app = express()
const port = process.env.PORT || 4000
const httpServer = createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: [
			'http://localhost:3000',
			'https://harmony-45tv.onrender.com',
			'https://chat-app-0iem.onrender.com',
		],
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
		credentials: true,
	},
})

/* <-- Middleware --> */

const allowedOrigins = [
	'http://localhost:3000',
	'https://harmony-45tv.onrender.com',
]

app.use(
	cors({
		origin: function (origin, callback) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (!origin) return callback(null, true)
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					'The CORS policy for this site does not allow access from the specified Origin.'
				return callback(new Error(msg), false)
			}
			return callback(null, true)
		},
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
		credentials: true,
	})
)

app.enable('trust proxy')
app.set('trust proxy', 1)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
	session({
		secret: process.env.EXPRESS_SESSION_SECRET as string,
		resave: false,
		saveUninitialized: false,
		cookie: {
			sameSite: 'none',
			secure: true,
		},
	})
)

app.use(passport.session())
app.use(passport.initialize())

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
	socket.on('join', (room) => {
		socket.join(room)
	})

	socket.on('leave', (room) => {
		socket.leave(room)
	})

	socket.on('chat', (data) => {
		io.to(data.id).emit('chat', data.messages)
	})
})

io.engine.on('connection_error', (err: any | unknown) => {
	const { req, code, message, context } = err

	console.log(req)
	console.log(code)
	console.log(message)
	console.log(context)
})
