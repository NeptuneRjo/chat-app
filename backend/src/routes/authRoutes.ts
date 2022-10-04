import { Router } from 'express'
import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import 'dotenv/config'

const router = Router()

// Login and/or Signup
router.get(
	'/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/logout', (req, res, next) => {
	req.session.destroy(() => {
		res.status(200).json({ data: req.user })
	})
})

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: process.env.REDIRECT_URL as string,
		failureRedirect: '/auth/failure',
	})
)

router.get('/login', (req, res) => {
	res.status(200).json({
		data: req.user,
	})
})

router.get('/failure', (req, res) => {
	res.send('something went wrong')
})

export default router
