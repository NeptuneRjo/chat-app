"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_room = exports.post_new_room = exports.patch_new_message = exports.patch_join_room = exports.get_room = void 0;
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
    const findUser = room === null || room === void 0 ? void 0 : room.users.find(({ username }) => username === user.username);
    if (findUser && room) {
        res.json({
            data: {
                messages: room === null || room === void 0 ? void 0 : room.messages,
                roomId: room === null || room === void 0 ? void 0 : room.roomId,
                users: room === null || room === void 0 ? void 0 : room.users,
            },
        });
    }
    else if (!findUser && room) {
        room === null || room === void 0 ? void 0 : room.updateOne({
            $push: {
                users: { username: user.username, owner: false },
            },
        }, { new: true }).then(() => {
            models_1.User.findOneAndUpdate({ username: user.username }, {
                $push: {
                    rooms: room,
                },
            });
        }).catch((err) => {
            console.log(err);
        });
        res.json({
            data: {
                messages: room === null || room === void 0 ? void 0 : room.messages,
                roomId: room === null || room === void 0 ? void 0 : room.roomId,
                users: room === null || room === void 0 ? void 0 : room.users,
            },
        });
    }
    else {
        res.status(404).json(notFoundError);
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
