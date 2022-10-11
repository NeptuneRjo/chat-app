import { describe, expect, test } from '@jest/globals'
import { newMessage } from './Api'
import {
	logoutAndSetUser,
	getAndSetRoom,
	getAndSetUser,
	getAndSetNewMessage,
} from './Global/utils'

const MOCK_USER = {
	data: {
		_id: '633157796615ad7796d2a563',
		googleId: '110782799026274343906',
		__v: 0,
		picture:
			'https://lh3.googleusercontent.com/a/ALm5wu06nBlGCIGrALTY5JqS0gH4EgoBZYsmih1mTUPyUg=s96-c',
		displayName: 'Neptune',
	},
}

const MOCK_MESSAGE = {
	handle: 'Neptune',
	message: 'Hello World!',
}

const MOCK_ERROR = {
	error: 'Error',
}

const unmockedFetch = global.fetch

const mockFetch = async (data: object) => {
	global.fetch = jest
		.fn()
		.mockImplementation(
			jest.fn(() =>
				Promise.resolve({ json: () => Promise.resolve(data) })
			) as jest.Mock
		)
}

describe('main', () => {
	afterAll(() => {
		global.fetch = unmockedFetch
	})

	describe('getAndSetUser', () => {
		// The MOCK objects only include one half of the response obj each.
		// error is implicitely undefined for MOCK_USER and vice-versa

		test('returns a user when a user is provided', async () => {
			mockFetch(MOCK_USER)

			const response = await getAndSetUser('token')
			expect(response).toEqual(MOCK_USER)
		})

		test('returns an error when an error is provided', async () => {
			mockFetch(MOCK_ERROR)

			const response = await getAndSetUser('token')
			expect(response).toEqual(MOCK_ERROR)
		})
	})

	describe('logoutAndSetUser', () => {
		test('returns a logged out user', async () => {
			mockFetch({ data: undefined })

			const response = await logoutAndSetUser()
			expect(response).toEqual({ data: undefined, error: undefined })
		})

		test('returns an errror', async () => {
			mockFetch({ error: 'Error' })

			const response = await logoutAndSetUser()
			expect(response).toEqual({ data: undefined, error: 'Error' })
		})
	})

	describe('getAndSet - new message', () => {
		test('returns the new messages', async () => {
			mockFetch({ data: MOCK_MESSAGE })

			const response = await getAndSetNewMessage('room-1', MOCK_MESSAGE)

			expect(response).toEqual({ data: MOCK_MESSAGE, error: undefined })
		})
	})
})
