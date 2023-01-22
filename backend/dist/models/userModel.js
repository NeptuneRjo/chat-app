"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    rooms: { type: Array },
});
userSchema.pre('save', async function (next) {
    const salt = await bcrypt_1.default.genSalt(16);
    const hash = await bcrypt_1.default.hash(this.password, salt);
    this.password = hash;
    next();
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
