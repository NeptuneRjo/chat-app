import { Router } from 'express'
import {
	get_room,
	post_new_message,
	post_new_room,
	delete_room,
	post_new_member,
} from '../controllers/chatControllers'

const router = Router()

router.route('/:id').get(get_room).delete(delete_room)

router.route('/:id/new-message').patch(post_new_message)
router.route('/:id/new-user').patch(post_new_member)

router.route('/new-room').post(post_new_room)

export default router
