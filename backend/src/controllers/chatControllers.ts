import { Request, Response } from 'express'
import { Room, Message } from '../models'

const notFoundError: { err: string } = {
	err: 'Unable to find a room with that id',
}

export const get_room = async (req: Request, res: Response) => {
	const { id } = req.params

	const room = await Room.findById(id)

	if (room) {
		res.status(200).json({ data: room })
	} else {
		res.status(404).json(notFoundError)
	}
}

export const post_new_message = async (req: Request, res: Response) => {
	const { id } = req.params

	const message = new Message(req.body)
	message.save((err) => {
		if (err) res.status(400).json({ err: err })
	})

	const room = await Room.findByIdAndUpdate(id, {
		$push: { messages: message },
	})

	if (!room) res.status(404).json(notFoundError)
}

export const post_new_member = async (req: Request, res: Response) => {
	const { id } = req.params

	const room = await Room.findByIdAndUpdate(id, {
		$push: { members: req.body },
	})

	if (!room) res.status(404).json(notFoundError)
}

export const post_new_room = async (req: Request, res: Response) => {
	const room = new Room(req.body)

	if (!room)
		res.status(400).json({ err: 'Unable to create a room at this time' })

	res.status(200).json({ data: room })
}

export const delete_room = async (req: Request, res: Response) => {
	const { id } = req.params
	const room = await Room.findById(id)

	if (!room) res.status(404).json(notFoundError)

	Room.findByIdAndDelete(id)
		.then(() => {
			res.status(200).json({ data: 'Successfully deleted room' })
		})
		.catch((err) => {
			res.status(400).json({ err: err })
		})
}
