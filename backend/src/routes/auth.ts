import { Router } from 'express'
import passport from 'passport'

const router = Router()

const isLoggedIn = (req: any, res: any, next: any) => {
	console.log(req.user)
	req.user ? next() : res.sendStatus(401)
}

router.route('/signup').post((req, res) => res.send('POST signup'))
router.route('/login').post((req, res) => res.send('POST login'))
router.route('/logout').post((req, res) => res.send('POST logout'))

router
	.route('/')
	.get((req, res) =>
		res.send('<a href="/auth/google">Authenticate with Google</a>')
	)
router.route('/protected').get(isLoggedIn, (req, res) => {
	res.send(`Hello!`)
})

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/protected',
		failureRedirect: '/auth/failure',
	})
)

router.get('/auth/failure', (req, res) => {
	res.send('something went wrong')
})

router.get('/logout', (req, res, next) => {
	req.session.destroy(() => {
		console.log(req.user)
		res.send('Goodbye')
	})
})

export default router
