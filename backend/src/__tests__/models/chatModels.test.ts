import { Room, Message } from '../../models'
import {
	fakeMessage,
	fakeMessageFail,
	fakeRoom,
	fakeRoomFail,
} from '../fixtures/fixtures'
import {
	initializeMongoServer,
	deinitializeMongoServer,
	dropCollections,
} from '../config/mongoConfigTest'

import 'jest'

describe('Chat Models', () => {
	beforeAll(async () => {
		const mongoServer = await initializeMongoServer()
	})

	afterAll(async () => {
		await deinitializeMongoServer()
	})

	afterEach(async () => {
		await dropCollections()
	})

	describe('Message Model', () => {
		it('should create a message item successfully', async () => {
			const newMessage = await Message.create(fakeMessage)
			const { _id, handle, message, date } = newMessage

			expect(_id).toBeDefined()
			expect(handle).toBe(fakeMessage.handle)
			expect(message).toBe(fakeMessage.message)
			expect(date).toBe(date)
		})

		it('should fail to create a message item with no content', async () => {
			let error = null
			try {
				const newMessage = new Message()
				await newMessage.validate()
			} catch (err) {
				error = err
			}

			expect(error).not.toBeNull()
		})

		it('should fail to create a message with the wrong field types', async () => {
			try {
				const newMessage = new Message(fakeMessageFail)
				await newMessage.validate()
			} catch (err) {
				expect(err).not.toBeNull()
			}
		})
	})

	describe('Room model', () => {
		it('should create a room item successfully', async () => {
			const newRoom = await Room.create(fakeRoom)
			const { _id, messages, roomId } = newRoom

			expect(_id).toBeDefined()
			expect(roomId).toBe(fakeRoom.roomId)
			expect(messages).toStrictEqual(fakeRoom.messages)
		})

		it('should fail to create a room item with no content', async () => {
			let error = null
			try {
				const newRoom = new Room()
				await newRoom.validate()
			} catch (err) {
				error = err
			}

			expect(error).not.toBeNull()
		})

		it('should fail to create a room with the wrong field types', async () => {
			try {
				const newRoom = new Message(fakeRoomFail)
				await newRoom.validate()
			} catch (err) {
				expect(err).not.toBeNull()
			}
		})
	})
})
