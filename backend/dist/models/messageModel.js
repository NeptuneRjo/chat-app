"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageModel = new mongoose_1.Schema({
    handle: { type: String, required: true },
    message: { type: String, required: true },
    data: {
        type: Date,
        default: Date.now(),
    },
});
const Message = (0, mongoose_1.model)('Message', messageModel);
exports.default = Message;
