import { Schema, model, Model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import 'dotenv/config'
import { RoomType } from '../types'

interface IUser {
	username: string
	password: string
	rooms: RoomType
}

interface IUserMethods {
	generateJWT(): string
}

type UserModel = Model<IUser, {}, IUserMethods>

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
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

const secretOrKey = process.env.JWT_SECRET_DEV as string

userSchema.methods.generateJWT = function () {
	const token = jwt.sign(
		{
			expiresIn: '12h',
			id: this._id,
			provider: this.provider,
		},
		secretOrKey
	)

	return token
}

const User = model<IUser, UserModel>('User', userSchema)

export default User
