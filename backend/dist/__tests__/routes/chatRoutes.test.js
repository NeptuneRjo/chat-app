"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoConfigTest_1 = require("../config/mongoConfigTest");
require("jest");
require("dotenv/config");
const server = (0, supertest_1.default)('http://localhost:4000');
describe('Chat tests', () => {
    beforeAll(async () => {
        const mongoServer = await (0, mongoConfigTest_1.initializeMongoServer)();
    });
    afterAll(async () => {
        await (0, mongoConfigTest_1.deinitializeMongoServer)();
    });
    const creatRoom = () => {
        server
            .post('/chat/new-room')
            .send({
            roomId: 'room-1',
            messages: ['Hello world!'],
        })
            .set('Accept', 'application/json')
            .expect(200);
    };
    it('creates a room', async () => {
        creatRoom();
    });
    it('gets room', async () => {
        server
            .get('/chat/room-1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(/json/);
    });
    it('patches room', async () => {
        const isCorrectMessages = (res) => {
            res.body.should.have.property('messages', [
                'Hello world!',
                'Goodbye world!',
            ]);
        };
        server
            .patch('/chat/room-1')
            .send({ messages: 'Goodbye world!' })
            .set('Accept', 'application/json')
            .expect(200)
            .expect(isCorrectMessages);
    });
    it('deletes room', async () => {
        const isCorrectDeleteResponse = (res) => {
            res.body.should.have.property('data', 'Successfully deleted room');
        };
        server.delete('/chat/room-1').expect(200).expect(isCorrectDeleteResponse);
    });
});
