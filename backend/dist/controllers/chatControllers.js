"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_room = exports.post_new_room = exports.patch_leave_room = exports.patch_new_message = exports.patch_join_room = exports.get_room = void 0;
const models_1 = require("../models");
const uuid_1 = require("uuid");
const notFoundError = {
    message: 'Unable to find a room with that id',
};
const get_room = async (req, res) => {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    const room = await models_1.Room.findOne({ roomId: id });
    if (room) {
        res.json({
            data: {
                messages: room === null || room === void 0 ? void 0 : room.messages,
                roomId: room === null || room === void 0 ? void 0 : room.roomId,
                users: room === null || room === void 0 ? void 0 : room.users,
            },
        });
    }
    else {
        res.status(400).json({ message: 'No room found.' });
    }
};
exports.get_room = get_room;
const patch_join_room = async (req, res) => {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    const user = req === null || req === void 0 ? void 0 : req.user;
    const room = await models_1.Room.findOne({ roomId: id });
    // Checks if the user is already in the room.
    const findUser = room === null || room === void 0 ? void 0 : room.users.find(({ username }) => username === user.username);
    // Checks if the user already has the room.
    const findRoom = user === null || user === void 0 ? void 0 : user.rooms.find(({ roomId }) => roomId === (room === null || room === void 0 ? void 0 : room.roomId));
    // If the users is already in the room just return it.
    if (findUser && room) {
        res.json({
            data: {
                messages: room === null || room === void 0 ? void 0 : room.messages,
                roomId: room === null || room === void 0 ? void 0 : room.roomId,
                users: room === null || room === void 0 ? void 0 : room.users,
            },
        });
    }
    else if (!findUser && room && !findRoom) {
        try {
            // If the user isn't already in the room,
            // update the room and return it.
            const updatedRoom = await models_1.Room.findOneAndUpdate({ roomId: id }, {
                $push: {
                    users: { username: user.username, owner: false },
                },
            }, { new: true });
            // Add the room to the user's room list.
            const updatedUser = await models_1.User.findOneAndUpdate({ username: user.username }, {
                $push: {
                    rooms: room,
                },
            }, { new: true });
            res.json({
                data: {
                    messages: updatedRoom === null || updatedRoom === void 0 ? void 0 : updatedRoom.messages,
                    roomId: updatedRoom === null || updatedRoom === void 0 ? void 0 : updatedRoom.roomId,
                    users: updatedRoom === null || updatedRoom === void 0 ? void 0 : updatedRoom.users,
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    else if (findRoom && room) {
        // If the room exists in the user, but the user isn't in the room
        try {
            const updatedRoom = await models_1.Room.findOneAndUpdate({ roomId: id }, {
                $push: {
                    users: { username: user.username, owner: false },
                },
            }, { new: true });
            res.json({
                data: {
                    messages: updatedRoom === null || updatedRoom === void 0 ? void 0 : updatedRoom.messages,
                    roomId: updatedRoom === null || updatedRoom === void 0 ? void 0 : updatedRoom.roomId,
                    users: updatedRoom === null || updatedRoom === void 0 ? void 0 : updatedRoom.users,
                },
            });
        }
        catch (error) {
            console.log(error);
        }
        res.status(404).json({ message: 'No room found with that id' });
    }
};
exports.patch_join_room = patch_join_room;
const patch_new_message = async (req, res) => {
    const { id } = req.params;
    const message = new models_1.Message(req.body);
    await models_1.Room.findOneAndUpdate({ roomId: id }, {
        $push: { messages: message },
    });
    const room = await models_1.Room.findOne({ roomId: id });
    if (!room)
        res.status(400).json({ message: 'No room found.' });
    res.status(200).json({
        data: {
            messages: room === null || room === void 0 ? void 0 : room.messages,
            roomId: room === null || room === void 0 ? void 0 : room.roomId,
            users: room === null || room === void 0 ? void 0 : room.users,
        },
    });
};
exports.patch_new_message = patch_new_message;
const patch_leave_room = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const room = await models_1.Room.findOne({ roomId: id });
    const member = room === null || room === void 0 ? void 0 : room.users.find(({ username }) => username === user.username);
    if (room) {
        if (member) {
            room === null || room === void 0 ? void 0 : room.updateOne({
                $pull: {
                    users: { username: user.username },
                },
            });
            models_1.User.findOneAndUpdate({ username: user.username }, {
                $pull: {
                    room: { roomId: room === null || room === void 0 ? void 0 : room.roomId },
                },
            }, { new: true });
            res.json({ message: 'Left room successfully', data: {} });
        }
    }
    else {
        res.json({ message: 'No room found.' });
    }
};
exports.patch_leave_room = patch_leave_room;
const post_new_room = async (req, res) => {
    ;
    (async function generateNewRoom() {
        const uuid = (0, uuid_1.v4)().split('-')[0];
        const exists = await models_1.Room.findOne({ roomId: uuid });
        const { username, _id } = req === null || req === void 0 ? void 0 : req.user;
        if (exists) {
            generateNewRoom();
        }
        else {
            const room = new models_1.Room({
                messages: [],
                roomId: uuid,
                users: req.user ? [{ username, owner: true }] : [],
            });
            room.save();
            if (!room) {
                res.status(400).json({ message: 'Unable to create a room' });
            }
            await models_1.User.findOneAndUpdate({ _id: _id }, {
                $push: { rooms: room },
            });
            res.status(200).json({
                message: 'Room created successfully',
                data: {
                    messages: room.messages,
                    roomId: room.roomId,
                    users: room.users,
                },
            });
        }
    })();
};
exports.post_new_room = post_new_room;
const delete_room = async (req, res) => {
    const { id } = req.params;
    const room = await models_1.Room.findOne({ roomId: id });
    const sessionUser = req.user;
    const owner = room === null || room === void 0 ? void 0 : room.users.find((elem) => elem.owner);
    if (!room)
        res.status(404).json({ message: 'No room found.' });
    if (room) {
        if (owner.username === sessionUser.username) {
            for (let i = 0; i < room.users.length; i++) {
                models_1.User.updateOne({ username: room.users[i].username }, {
                    $pull: {
                        rooms: { roomId: room === null || room === void 0 ? void 0 : room.roomId },
                    },
                })
                    .then(() => {
                    models_1.Room.findOneAndDelete({ _id: room._id })
                        .then(() => {
                        res.json({ messages: 'Room deletion successful' });
                    })
                        .catch((err) => {
                        console.log(err);
                        res.status(400).json({
                            message: 'Room deletion unsuccessful',
                        });
                    });
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
        }
    }
};
exports.delete_room = delete_room;
