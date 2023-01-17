import express from 'express'
import cors from 'cors'
import passport from 'passport'
import { Server } from 'socket.io'
import { connection } from 'mongoose'
import http from 'http'
import { authRoutes, chatRoutes } from './routes'
import session from 'express-session'

import './config/mongoConfig'
import 'dotenv/config'
import './config/passport'
// import './config/authStrategies'

const app = express()
const port = process.env.PORT || 4000

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
	cors: {
		origin: [
			'http://localhost:3000',
			'https://harmony-static.onrender.com',
			'https://chat-app-0iem.onrender.com',
			'http://localhost:10000',
		],
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
		credentials: true,
	},
})

/* <-- Middleware --> */

app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'https://harmony-static.onrender.com',
			'https://chat-app-0iem.onrender.com',
			'http://localhost:10000',
		],
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
		credentials: true,
		preflightContinue: true,
	})
)

// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*')
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept'
// 	)
// 	next()
// })

app.enable('trust proxy')
app.set('trust proxy', 1)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET as string

app.use(
	session({
		secret: EXPRESS_SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		name: 'harmony',
		cookie: {
			sameSite: 'none',
			secure: true,
			domain: '.onrender.com',
		},
		proxy: true,
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
