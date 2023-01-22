import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import 'dotenv/config'

const userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	rooms: { type: Array },
})

userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(16)
	const hash = await bcrypt.hash(this.password, salt)

	this.password = hash

	next()
})

const User = model('User', userSchema)

export default User
