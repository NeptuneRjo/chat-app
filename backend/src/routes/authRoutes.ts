import { Router } from 'express'
import passport from 'passport'
import { User } from '../models'
import 'dotenv/config'

const router = Router()

const REDIRECT_URL = process.env.REDIRECT_URL as string

// Login and/or Signup
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
	})
)

router.get('/logout', (req, res, next) => {
	req.session.destroy(() => {
		res.status(200).json({ data: req.user })
	})
})

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/auth/failure',
		// session: false,
	}),
	(req, res) => {
		// const user = req.user as any
		// const token = user.generateJWT()

		res.cookie('test', 'hello world')
		res.redirect(REDIRECT_URL)
	}
)

router.get('/login', (req, res) => {
	console.log(req.cookies)
	res.status(200).json({ data: req.user })
})

router.get('/failure', (req, res) => {
	res.send('something went wrong')
})

export default router
