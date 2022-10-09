"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropCollections = exports.deinitializeMongoServer = exports.initializeMongoServer = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = require("mongoose");
let mongoServer = null;
const initializeMongoServer = async () => {
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    (0, mongoose_1.connect)(mongoUri);
    mongoose_1.connection.on('error', (err) => {
        if (err.message.code === 'ETIMEDOUT') {
            console.log(err);
            (0, mongoose_1.connect)(mongoUri);
        }
        console.log(err);
    });
};
exports.initializeMongoServer = initializeMongoServer;
const deinitializeMongoServer = async () => {
    if (mongoServer) {
        await mongoose_1.connection.dropDatabase();
        await mongoose_1.connection.close();
        await mongoServer.stop();
    }
};
exports.deinitializeMongoServer = deinitializeMongoServer;
const dropCollections = async () => {
    if (mongoServer) {
        const collections = await mongoose_1.connection.db.collections();
        for (let collection of collections) {
            await collection.drop();
        }
    }
};
exports.dropCollections = dropCollections;
