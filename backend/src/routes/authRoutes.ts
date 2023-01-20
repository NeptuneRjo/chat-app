import { Router } from 'express'
import passport from 'passport'
import {
	post_register_user,
	post_login_user,
	get_logout_user,
} from '../controllers/authControllers'

const router = Router()

router.get('/logout', get_logout_user)

router.post(
	'/login',
	passport.authenticate('local', { session: false }),
	post_login_user
)

router.post('/register', post_register_user)

export default router
