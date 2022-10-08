"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    googleId: { type: String, required: true },
    picture: { type: String, required: true },
    displayName: { type: String, required: true },
});
const User = (0, mongoose_1.model)('User', userModel);
exports.default = User;
