import { Request, Response } from 'express'
import { Room, Message, User } from '../models'
import { v4 as uuidv4 } from 'uuid'

const notFoundError: { message: string } = {
	message: 'Unable to find a room with that id',
}

export const get_room = async (req: Request, res: Response) => {
	const { id } = req?.params

	const room = await Room.findOne({ roomId: id })

	if (room) {
		res.json({
			data: {
				messages: room?.messages,
				roomId: room?.roomId,
				users: room?.users,
			},
		})
	} else {
		res.status(400).json({ message: 'No room found.' })
	}
}

export const patch_join_room = async (req: Request, res: Response) => {
	const { id } = req?.params
	const user = req?.user as any

	const room = await Room.findOne({ roomId: id })
	const findUser = room?.users.find(
		({ username }) => username === user.username
	)

	if (findUser && room) {
		res.json({
			data: {
				messages: room?.messages,
				roomId: room?.roomId,
				users: room?.users,
			},
		})
	} else if (!findUser && room) {
		room
			?.updateOne(
				{
					$push: {
						users: { username: user.username, owner: false },
					},
				},
				{ new: true }
			)
			.then(() => {
				User.findOneAndUpdate(
					{ username: user.username },
					{
						$push: {
							rooms: room,
						},
					}
				)
			})
			.catch((err) => {
				console.log(err)
			})

		res.json({
			data: {
				messages: room?.messages,
				roomId: room?.roomId,
				users: room?.users,
			},
		})
	} else {
		res.status(404).json(notFoundError)
	}
}

export const patch_new_message = async (req: Request, res: Response) => {
	const { id } = req.params

	const message = new Message(req.body)

	await Room.findOneAndUpdate(
		{ roomId: id },
		{
			$push: { messages: message },
		}
	)

	const room = await Room.findOne({ roomId: id })

	if (!room) res.status(400).json({ message: 'No room found.' })

	res.status(200).json({
		data: {
			messages: room?.messages,
			roomId: room?.roomId,
			users: room?.users,
		},
	})
}

export const post_new_room = async (req: Request, res: Response) => {
	;(async function generateNewRoom() {
		const uuid = uuidv4().split('-')[0]
		const exists = await Room.findOne({ roomId: uuid })
		const { username, _id } = req?.user as any

		if (exists) {
			generateNewRoom()
		} else {
			const room = new Room({
				messages: [],
				roomId: uuid,
				users: req.user ? [{ username, owner: true }] : [],
			})
			room.save()

			if (!room) {
				res.status(400).json({ message: 'Unable to create a room' })
			}

			await User.findOneAndUpdate(
				{ _id: _id },
				{
					$push: { rooms: room },
				}
			)

			res.status(200).json({
				message: 'Room created successfully',
				data: {
					messages: room.messages,
					roomId: room.roomId,
					users: room.users,
				},
			})
		}
	})()
}

export const delete_room = async (req: Request, res: Response) => {
	const { id } = req.params
	const room = await Room.findOne({ roomId: id })
	const sessionUser = req.user as any
	const owner = room?.users.find((elem) => elem.owner)

	if (!room) res.status(404).json({ message: 'No room found.' })

	if (room) {
		if (owner.username === sessionUser.username) {
			for (let i = 0; i < room.users.length; i++) {
				User.updateOne(
					{ username: room.users[i].username },
					{
						$pull: {
							rooms: { roomId: room?.roomId },
						},
					}
				)
					.then(() => {
						Room.findOneAndDelete({ _id: room._id })
							.then(() => {
								res.json({ messages: 'Room deletion successful' })
							})
							.catch((err) => {
								console.log(err)
								res.status(400).json({
									message: 'Room deletion unsuccessful',
								})
							})
					})
					.catch((err) => {
						console.log(err)
					})
			}
		}
	}
}
