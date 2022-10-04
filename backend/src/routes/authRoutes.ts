import { Router } from 'express'
import passport from 'passport'
import 'dotenv/config'

const router = Router()

// Login and/or Signup
router.get(
	'/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/logout', (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			res.status(400).json({ err: err })
		}
		res.status(200).json({ data: req.user })
	})
})

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: process.env.REDIRECT_URL,
		failureRedirect: '/auth/failure',
	}),
	(req, res, next) => {
		req.session.save((err) => {
			if (err) {
				return next(err)
			}

			res.status(200)
		})
	}
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
