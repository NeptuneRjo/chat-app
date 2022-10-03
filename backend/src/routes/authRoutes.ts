import { Router } from 'express'
import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

const router = Router()

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	req.user ? next() : res.sendStatus(401)
}

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
		successRedirect: 'http://localhost:3000/',
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
