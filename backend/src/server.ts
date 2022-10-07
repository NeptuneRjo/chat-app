import express from 'express'
import cors from 'cors'
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
const io = new Server(httpServer, {
	cors: {
		origin: [
			'https://neptunerjo.github.io',
			'https://neptunerjo.github.io/',
			'http://localhost:3000',
			'http://chatapp-env.eba-qxaypqjg.us-east-1.elasticbeanstalk.com',
		],
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
		credentials: true,
	},
})

/* <-- Middleware --> */
app.set('trust proxy', 1)

app.use(
	cors({
		origin: [
			'https://neptunerjo.github.io',
			'https://neptunerjo.github.io/',
			'http://localhost:3000',
			'http://chatapp-env.eba-qxaypqjg.us-east-1.elasticbeanstalk.com',
		],
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
		credentials: true,
	})
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
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
