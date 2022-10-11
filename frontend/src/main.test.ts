import { describe, expect, test } from '@jest/globals'
import { getRoom, getUser, logoutUser, newMessage } from './Api'
import { getAndSet } from './Global/utils'

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

const MOCK_ROOM = {
	_id: '6338abc1410615f2ea203b26',
	roomId: 'room-1',
	__v: 0,
	messages: [],
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

	describe('getAndSet - login', () => {
		test('returns a user when a user is provided', async () => {
			mockFetch(MOCK_USER)

			const response = await getAndSet(getUser, 'token')
			expect(response).toEqual(MOCK_USER)
		})

		test('returns an error when an error is provided', async () => {
			mockFetch(MOCK_ERROR)

			const response = await getAndSet(getUser, 'token')
			expect(response).toEqual(MOCK_ERROR)
		})
	})

	describe('getAndSet - logout', () => {
		test('returns a logged out user', async () => {
			mockFetch({ data: undefined })

			const response = await getAndSet(logoutUser)
			expect(response).toEqual({ data: undefined, error: undefined })
		})

		test('returns an error', async () => {
			mockFetch({ error: 'Error' })

			const response = await getAndSet(logoutUser)
			expect(response).toEqual({ data: undefined, error: 'Error' })
		})
	})

	describe('getAndSet - new message', () => {
		test('returns the new messages', async () => {
			mockFetch({ data: MOCK_MESSAGE })

			const response = await getAndSet(newMessage, 'room-1', MOCK_MESSAGE)
			expect(response).toEqual({ data: MOCK_MESSAGE, error: undefined })
		})

		test('returns an error', async () => {
			mockFetch({ error: 'Error' })

			const response = await getAndSet(newMessage, 'room-1', MOCK_MESSAGE)
			expect(response).toEqual({ data: undefined, error: 'Error' })
		})
	})

	describe('getAndSet - get room', () => {
		test('returns the room', async () => {
			mockFetch({ data: MOCK_ROOM })

			const response = await getAndSet(getRoom, 'room-1')
			expect(response).toEqual({ data: MOCK_ROOM, error: undefined })
		})

		test('returns an error', async () => {
			mockFetch({ error: 'Error' })

			const response = await getAndSet(getRoom, 'room-1')
			expect(response).toEqual({ data: undefined, error: 'Error' })
		})
	})
})
