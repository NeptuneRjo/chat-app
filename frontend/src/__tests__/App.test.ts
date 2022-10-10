import { describe, expect, test } from '@jest/globals'
import { getAndSetUser } from '../Global/utils'

const MOCK_DATA = {
	data: {
		_id: '633157796615ad7796d2a563',
		googleId: '110782799026274343906',
		__v: 0,
		picture:
			'https://lh3.googleusercontent.com/a/ALm5wu06nBlGCIGrALTY5JqS0gH4EgoBZYsmih1mTUPyUg=s96-c',
		displayName: 'Neptune',
	},
}

const MOCK_ERROR = {
	error: 'User not found',
}

const unmockedFetch = global.fetch

describe('App', () => {
	afterAll(() => {
		global.fetch = unmockedFetch
	})

	describe('getAndSetUser', () => {
		// The MOCK objects only include one half of the response obj each.
		// error is implicitely undefined for MOCK_DATA and vice-versa

		test('returns a user when a user is provided', async () => {
			global.fetch = jest
				.fn()
				.mockImplementation(
					jest.fn(() =>
						Promise.resolve({ json: () => Promise.resolve(MOCK_DATA) })
					) as jest.Mock
				)

			const response = await getAndSetUser('token')
			expect(response).toEqual(MOCK_DATA)
		})

		test('returns an error when an error is provided', async () => {
			global.fetch = jest
				.fn()
				.mockImplementation(
					jest.fn(() =>
						Promise.resolve({ json: () => Promise.resolve(MOCK_ERROR) })
					) as jest.Mock
				)

			const response = await getAndSetUser('token')
			expect(response).toEqual(MOCK_ERROR)
		})
	})
})
