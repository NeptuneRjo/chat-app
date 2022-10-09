import request from 'supertest'
import {
	initializeMongoServer,
	deinitializeMongoServer,
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

	it('gets the user', async () => {
		server
			.get('/auth/login')
			.set('Accept', 'application/json')
			.expect(200)
			.expect(/json/)
	})

	it('logs out the user', async () => {
		const returnsLoggedOutUser = async (res: any) => {
			res.body.should.have('data', undefined)
		}

		server
			.get('/auth/logout')
			.set('Accept', 'application/json')
			.expect(200)
			.expect(/json/)
			.expect(returnsLoggedOutUser)
	})
})
