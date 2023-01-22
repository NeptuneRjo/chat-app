import { Router } from 'express'
import {
	get_room,
	patch_new_message,
	post_new_room,
	delete_room,
	patch_join_room,
} from '../controllers/chatControllers'

import passport from 'passport'

const router = Router()

router
	.route('/room/:id')
	.get(get_room)
	.delete(passport.authenticate('jwt', { session: false }), delete_room)
	.patch(passport.authenticate('jwt', { session: false }), patch_new_message)

router
	.route('/join-room/:id')
	.patch(passport.authenticate('jwt', { session: false }), patch_join_room)

router
	.route('/create-room')
	.post(passport.authenticate('jwt', { session: false }), post_new_room)

export default router
