import request from 'supertest'
import {
	initializeMongoServer,
	deinitializeMongoServer,
	dropCollections,
} from '../config/mongoConfigTest'

import 'jest'
import 'dotenv/config'

const server = request('http://localhost:4000')

describe('Chat tests', () => {
	beforeAll(async () => {
		const mongoServer = await initializeMongoServer()
	})

	afterAll(async () => {
		await deinitializeMongoServer()
	})

	const creatRoom = () => {
		server
			.post('/chat/new-room')
			.send({
				roomId: 'room-1',
				messages: ['Hello world!'],
			})
			.set('Accept', 'application/json')
			.expect(200)
	}

	it('creates a room', async () => {
		creatRoom()
	})

	it('gets room', async () => {
		server
			.get('/chat/room-1')
			.set('Accept', 'application/json')
			.expect(200)
			.expect(/json/)
	})

	it('patches room', async () => {
		const isCorrectMessages = (res: any) => {
			res.body.should.have.property('messages', [
				'Hello world!',
				'Goodbye world!',
			])
		}

		server
			.patch('/chat/room-1')
			.send({ messages: 'Goodbye world!' })
			.set('Accept', 'application/json')
			.expect(200)
			.expect(isCorrectMessages)
	})

	it('deletes room', async () => {
		const isCorrectDeleteResponse = (res: any) => {
			res.body.should.have.property('data', 'Successfully deleted room')
		}

		server.delete('/chat/room-1').expect(200).expect(isCorrectDeleteResponse)
	})
})
