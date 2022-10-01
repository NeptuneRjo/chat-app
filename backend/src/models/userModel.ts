import { Schema, model } from 'mongoose'

const userModel = new Schema({
	googleId: { type: String },
	picture: { type: String },
	displayName: { type: String },
})

const User = model('User', userModel)

export default User
