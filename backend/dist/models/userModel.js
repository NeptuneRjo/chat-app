"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    googleId: { type: String },
    picture: { type: String },
    displayName: { type: String },
});
const User = (0, mongoose_1.model)('User', userModel);
exports.default = User;
