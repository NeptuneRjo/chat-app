"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeUserFail = exports.fakeUser = exports.fakeRoomFail = exports.fakeRoom = exports.fakeMessageFail = exports.fakeMessage = void 0;
exports.fakeMessage = {
    handle: 'Neptune',
    message: 'Hello World!',
};
exports.fakeMessageFail = {
    handle: 1,
    message: 2,
};
exports.fakeRoom = {
    messages: [],
    roomId: 'room-1',
};
exports.fakeRoomFail = {
    messages: [1],
    roomId: 1,
};
exports.fakeUser = {
    googleId: '123',
    displayName: 'Neptune',
    picture: '456',
};
exports.fakeUserFail = {
    googleId: 123,
    displayName: 'Neptune',
    picture: 456,
};
