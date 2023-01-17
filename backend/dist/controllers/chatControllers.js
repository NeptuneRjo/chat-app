"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_room = exports.post_new_room = exports.post_new_message = exports.get_room = void 0;
const models_1 = require("../models");
const notFoundError = {
    err: 'Unable to find a room with that id',
};
const get_room = async (req, res) => {
    const { id } = req.params;
    const room = await models_1.Room.findOne({ roomId: id });
    if (room) {
        res.status(200).json({ data: room });
    }
    else {
        res.status(404).json(notFoundError);
    }
};
exports.get_room = get_room;
const post_new_message = async (req, res) => {
    const { id } = req.params;
    const message = new models_1.Message(req.body);
    await models_1.Room.findOneAndUpdate({ roomId: id }, {
        $push: { messages: message },
    });
    const room = await models_1.Room.findOne({ roomId: id });
    if (!room)
        res.status(404).json(notFoundError);
    res.status(200).json({ data: room });
};
exports.post_new_message = post_new_message;
const post_new_room = async (req, res) => {
    const room = new models_1.Room(req.body);
    room.save();
    if (!room)
        res.status(400).json({ err: 'Unable to create a room at this time' });
    res.status(200).json({ data: room });
};
exports.post_new_room = post_new_room;
const delete_room = async (req, res) => {
    const { id } = req.params;
    const room = await models_1.Room.findOne({ roomId: id });
    if (!room)
        res.status(404).json(notFoundError);
    models_1.Room.findByIdAndDelete(id)
        .then(() => {
        res.status(200).json({ data: 'Successfully deleted room' });
    })
        .catch((err) => {
        res.status(400).json({ err: err });
    });
};
exports.delete_room = delete_room;
