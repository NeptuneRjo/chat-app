import { Router } from 'express'
import { Message, Room } from '../models'

const router = Router()

router
	.route('/:id')
	.get((req, res) => res.send(`GET all messages in room:${req.params.id}`))
	.patch((req, res) => res.send('PATCH new room'))
	.delete((req, res) => res.send('DELETE room'))

router.route('/new-room').post((req, res) => res.send('POST new room'))

export default router
