"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const fixtures_1 = require("../fixtures/fixtures");
const mongoConfigTest_1 = require("../config/mongoConfigTest");
require("jest");
describe('User Model', () => {
    beforeAll(async () => {
        const mongoServer = await (0, mongoConfigTest_1.initializeMongoServer)();
    });
    afterAll(async () => {
        await (0, mongoConfigTest_1.deinitializeMongoServer)();
    });
    afterEach(async () => {
        await (0, mongoConfigTest_1.dropCollections)();
    });
    it('should create the user item successfully', async () => {
        const newUser = await models_1.User.create(fixtures_1.fakeUser);
        const { googleId, picture, displayName } = newUser;
        expect(googleId).toBe(fixtures_1.fakeUser.googleId);
        expect(picture).toBe(fixtures_1.fakeUser.picture);
        expect(displayName).toBe(fixtures_1.fakeUser.displayName);
    });
    it('should fail to create the user item with no content', async () => {
        let error = null;
        try {
            const newUser = new models_1.User();
            await newUser.validate();
        }
        catch (err) {
            error = err;
        }
        expect(error).not.toBeNull();
    });
    it('should fail to create a user with invalid field types', async () => {
        try {
            const newUser = new models_1.User(fixtures_1.fakeUserFail);
            await newUser.validate();
        }
        catch (err) {
            expect(err).not.toBeNull();
        }
    });
});
