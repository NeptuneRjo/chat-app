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
    it('gets the user', async () => {
        server
            .get('/auth/login')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(/json/);
    });
    it('logs out the user', async () => {
        const returnsLoggedOutUser = async (res) => {
            res.body.should.have('data', undefined);
        };
        server
            .get('/auth/logout')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(/json/)
            .expect(returnsLoggedOutUser);
    });
});
