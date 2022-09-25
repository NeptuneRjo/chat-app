"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomModel = new mongoose_1.Schema({
    members: { type: Array },
    messages: { type: Array },
});
const Room = (0, mongoose_1.model)('Room', roomModel);
exports.default = Room;
