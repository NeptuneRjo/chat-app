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

	// Checks if the user is already in the room.
	const findUser = room?.users.find(
		({ username }) => username === user.username
	)
	// Checks if the user already has the room.
	const findRoom = user?.rooms.find(
		({ roomId }: { roomId: string }) => roomId === room?.roomId
	)

	// If the users is already in the room just return it.
	if (findUser && room) {
		res.json({
			data: {
				messages: room?.messages,
				roomId: room?.roomId,
				users: room?.users,
			},
		})
	} else if (!findUser && room && !findRoom) {
		try {
			// If the user isn't already in the room,
			// update the room and return it.
			const updatedRoom = await Room.findOneAndUpdate(
				{ roomId: id },
				{
					$push: {
						users: { username: user.username, owner: false },
					},
				},
				{ new: true }
			)
			// Add the room to the user's room list.
			const updatedUser = await User.findOneAndUpdate(
				{ username: user.username },
				{
					$push: {
						rooms: room,
					},
				},
				{ new: true }
			)

			res.json({
				data: {
					messages: updatedRoom?.messages,
					roomId: updatedRoom?.roomId,
					users: updatedRoom?.users,
				},
			})
		} catch (error) {
			console.log(error)
		}
	} else if (findRoom && room) {
		// If the room exists in the user, but the user isn't in the room
		try {
			const updatedRoom = await Room.findOneAndUpdate(
				{ roomId: id },
				{
					$push: {
						users: { username: user.username, owner: false },
					},
				},
				{ new: true }
			)

			res.json({
				data: {
					messages: updatedRoom?.messages,
					roomId: updatedRoom?.roomId,
					users: updatedRoom?.users,
				},
			})
		} catch (error) {
			console.log(error)
		}
		res.status(404).json({ message: 'No room found with that id' })
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

export const patch_leave_room = async (req: Request, res: Response) => {
	const { id } = req.params
	const user = req.user as any
	const room = await Room.findOne({ roomId: id })

	const member = room?.users.find(({ username }) => username === user.username)

	if (room) {
		if (member) {
			room?.updateOne({
				$pull: {
					users: { username: user.username },
				},
			})

			User.findOneAndUpdate(
				{ username: user.username },
				{
					$pull: {
						room: { roomId: room?.roomId },
					},
				},
				{ new: true }
			)

			res.json({ message: 'Left room successfully', data: {} })
		}
	} else {
		res.json({ message: 'No room found.' })
	}
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
