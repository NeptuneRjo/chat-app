import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { User } from '../models'
import { Request, Response } from 'express'
import 'dotenv/config'

export const post_register_user = async (req: Request, res: Response) => {
	const { username, password, password2 } = req.body

	const existingUser = await User.findOne({ username })

	if (existingUser) {
		return res.status(422).json({ error: 'Username is in use' })
	}

	if (password === password2) {
		const newUser = new User({ username: username, password: password })

		newUser.save()

		if (!newUser) {
			res.status(400).json({ message: 'Register unsuccessful' })
		}

		res.json({
			message: 'Register successful',
			data: {
				user: newUser.username,
				rooms: newUser.rooms,
			},
		})
	}
}

export const post_login_user = async (req: Request, res: Response) => {
	const secretOrKey = process.env.JWT_SECRET_DEV as string

	const { username, rooms, _id } = req.user as any
	const token = jwt.sign(
		{
			expiresIn: '12h',
			id: _id,
			username: username,
		},
		secretOrKey
	)

	res.json({
		message: 'Login successful',
		data: {
			user: username,
			rooms: rooms,
			token: token,
		},
	})
}

export const get_logout_user = async (req: Request, res: Response) => {
	req.logout((err) => {
		if (err) {
			return res.status(400).json({ message: 'Logout unsuccessful' })
		}

		res.json({ message: 'Logout successful' })
	})
}
