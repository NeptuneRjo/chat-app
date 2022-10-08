import express from 'express'
import { connect, connection } from 'mongoose'
import passport from 'passport'
import cors from 'cors'
import { initializeMongoServer } from './config/mongoConfigTest'
import { authRoutes, chatRoutes } from '../routes'
import { Server } from 'socket.io'
import { createServer } from 'http'

import 'dotenv/config'
import '../config/passport'

const app = express()
const port = process.env.PORT || 4000
const httpServer = createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: ['http://localhost:3000'],
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
		credentials: true,
	},
})

/* <-- Middleware --> */
app.set('trust proxy', 1)

app.use(
	cors({
		origin: ['http://localhost:3000'],
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

// Initializes Mongodb-Memory-Store
initializeMongoServer()

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
