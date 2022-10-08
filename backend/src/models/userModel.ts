import { Schema, model } from 'mongoose'

const userModel = new Schema({
	googleId: { type: String, required: true },
	picture: { type: String, required: true },
	displayName: { type: String, required: true },
})

const User = model('User', userModel)

export default User
