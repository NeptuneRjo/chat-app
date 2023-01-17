import { Request, Response } from 'express'
import { Room, Message } from '../models'

const notFoundError: { err: string } = {
	err: 'Unable to find a room with that id',
}

export const get_room = async (req: Request, res: Response) => {
	const { id } = req.params

	const room = await Room.findOne({ roomId: id })

	res.cookie('test', 'hello-world')
	if (room) {
		res.status(200).json({ data: room })
	} else {
		res.status(404).json(notFoundError)
	}
}

export const post_new_message = async (req: Request, res: Response) => {
	const { id } = req.params

	const message = new Message(req.body)

	await Room.findOneAndUpdate(
		{ roomId: id },
		{
			$push: { messages: message },
		}
	)

	const room = await Room.findOne({ roomId: id })

	if (!room) res.status(404).json(notFoundError)

	res.status(200).json({ data: room })
}

export const post_new_room = async (req: Request, res: Response) => {
	const room = new Room(req.body)
	room.save()

	if (!room)
		res.status(400).json({ err: 'Unable to create a room at this time' })

	res.status(200).json({ data: room })
}

export const delete_room = async (req: Request, res: Response) => {
	const { id } = req.params
	const room = await Room.findOne({ roomId: id })

	if (!room) res.status(404).json(notFoundError)

	Room.findByIdAndDelete(id)
		.then(() => {
			res.status(200).json({ data: 'Successfully deleted room' })
		})
		.catch((err) => {
			res.status(400).json({ err: err })
		})
}
