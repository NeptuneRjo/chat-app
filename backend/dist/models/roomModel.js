"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomModel = new mongoose_1.Schema({
    messages: { type: Array, required: true },
    roomId: { type: String, required: true },
});
const Room = (0, mongoose_1.model)('Room', roomModel);
exports.default = Room;
