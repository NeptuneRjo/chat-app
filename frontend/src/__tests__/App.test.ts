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

const unmockedFetch = global.fetch

describe('App', () => {
	beforeAll(() => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(MOCK_DATA),
			})
		) as jest.Mock
	})

	afterAll(() => {
		global.fetch = unmockedFetch
	})
})

describe('When the app fetches for the user', () => {
	test('returns a user when a user is provided', async () => {
		// const data = await getAndSetUser('1')
		const data = MOCK_DATA
		const t = await getAndSetUser('1')

		expect(t).toEqual(MOCK_DATA)
	})
})
