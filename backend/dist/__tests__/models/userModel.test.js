"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
// describe('User Model', () => {
// 	beforeAll(async () => {
// 		const mongoServer = await initializeMongoServer()
// 	})
// 	afterAll(async () => {
// 		await deinitializeMongoServer()
// 	})
// 	afterEach(async () => {
// 		await dropCollections()
// 	})
// 	it('should create the user item successfully', async () => {
// 		const newUser = await User.create(fakeUser)
// 		const { googleId, picture, displayName } = newUser
// 		expect(googleId).toBe(fakeUser.googleId)
// 		expect(picture).toBe(fakeUser.picture)
// 		expect(displayName).toBe(fakeUser.displayName)
// 	})
// 	it('should fail to create the user item with no content', async () => {
// 		let error = null
// 		try {
// 			const newUser = new User()
// 			await newUser.validate()
// 		} catch (err) {
// 			error = err
// 		}
// 		expect(error).not.toBeNull()
// 	})
// 	it('should fail to create a user with invalid field types', async () => {
// 		try {
// 			const newUser = new User(fakeUserFail)
// 			await newUser.validate()
// 		} catch (err) {
// 			expect(err).not.toBeNull()
// 		}
// 	})
// })
