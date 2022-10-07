import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const router = Router()

const REDIRECT_URL = process.env.REDIRECT_URL as string
const JWT_SECRET_PROD = process.env.JWT_SECRET_PROD as string
const JWT_SECRET_DEV = process.env.JWT_SECRET_DEV as string

// Login and/or Signup
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
		session: false,
	})
)

router.get('/logout', (req, res, next) => {
	res.status(200).json({ data: undefined })
})

router.get(
	'/google/callback',
	passport.authenticate('google', {
		session: false,
		failureRedirect: REDIRECT_URL,
	}),
	(req, res) => {
		const { _id, googleId, displayName } = req.user as any

		const token = jwt.sign(
			{
				expiresIn: '12h',
				id: _id,
				googleId: googleId,
				displayName: displayName,
			},
			JWT_SECRET_DEV
		)
		res.cookie('x-auth-cookie', token).redirect(REDIRECT_URL)
	}
)

router.get(
	'/login',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.status(200).json({ data: req.user })
	}
)

router.get('/failure', (req, res) => {
	res.send('something went wrong')
})

export default router
