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
		console.log(req.user)
		res.send('Goodbye')
	})
})

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
	if (req.user) {
		res.send(200).json({ data: req.user })
	} else {
		res.send(400).json({ error: 'Unable to log in at this time' })
	}
})

router.get('/failure', (req, res) => {
	res.send('something went wrong')
})

export default router
