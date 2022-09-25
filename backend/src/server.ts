import express, { urlencoded } from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import { Server } from 'socket.io'
import './config/mongoConfig'
import 'dotenv/config'
import { connection } from 'mongoose'
import { createServer } from 'http'

const app = express()
const port = process.env.PORT || 4000
const httpServer = createServer(app)
const io = new Server(httpServer, {})

/* <-- Middleware --> */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* <-- Routes --> */

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
