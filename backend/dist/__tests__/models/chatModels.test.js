"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const fixtures_1 = require("../fixtures/fixtures");
const mongoConfigTest_1 = require("../config/mongoConfigTest");
require("jest");
describe('Chat Models', () => {
    beforeAll(async () => {
        const mongoServer = await (0, mongoConfigTest_1.initializeMongoServer)();
    });
    afterAll(async () => {
        await (0, mongoConfigTest_1.deinitializeMongoServer)();
    });
    afterEach(async () => {
        await (0, mongoConfigTest_1.dropCollections)();
    });
    describe('Message Model', () => {
        it('should create a message item successfully', async () => {
            const newMessage = await models_1.Message.create(fixtures_1.fakeMessage);
            const { _id, handle, message, date } = newMessage;
            expect(_id).toBeDefined();
            expect(handle).toBe(fixtures_1.fakeMessage.handle);
            expect(message).toBe(fixtures_1.fakeMessage.message);
            expect(date).toBe(date);
        });
        it('should fail to create a message item with no content', async () => {
            let error = null;
            try {
                const newMessage = new models_1.Message();
                await newMessage.validate();
            }
            catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
        });
        it('should fail to create a message with the wrong field types', async () => {
            try {
                const newMessage = new models_1.Message(fixtures_1.fakeMessageFail);
                await newMessage.validate();
            }
            catch (err) {
                expect(err).not.toBeNull();
            }
        });
    });
    describe('Room model', () => {
        it('should create a room item successfully', async () => {
            const newRoom = await models_1.Room.create(fixtures_1.fakeRoom);
            const { _id, messages, roomId } = newRoom;
            expect(_id).toBeDefined();
            expect(roomId).toBe(fixtures_1.fakeRoom.roomId);
            expect(messages).toStrictEqual(fixtures_1.fakeRoom.messages);
        });
        it('should fail to create a room item with no content', async () => {
            let error = null;
            try {
                const newRoom = new models_1.Room();
                await newRoom.validate();
            }
            catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
        });
        it('should fail to create a room with the wrong field types', async () => {
            try {
                const newRoom = new models_1.Message(fixtures_1.fakeRoomFail);
                await newRoom.validate();
            }
            catch (err) {
                expect(err).not.toBeNull();
            }
        });
    });
});
