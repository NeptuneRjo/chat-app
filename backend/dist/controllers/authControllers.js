"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_logout_user = exports.post_login_user = exports.post_register_user = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
require("dotenv/config");
const post_register_user = async (req, res) => {
    const { username, password, password2 } = req.body;
    const existingUser = await models_1.User.findOne({ username });
    if (existingUser) {
        return res.status(422).json({ error: 'Username is in use' });
    }
    if (password === password2) {
        const newUser = new models_1.User({ username: username, password: password });
        newUser.save();
        if (!newUser) {
            res.status(400).json({ message: 'Register unsuccessful' });
        }
        res.json({
            message: 'Register successful',
            data: {
                user: newUser.username,
                rooms: newUser.rooms,
            },
        });
    }
};
exports.post_register_user = post_register_user;
const post_login_user = async (req, res) => {
    const secretOrKey = process.env.JWT_SECRET_DEV;
    const { username, rooms, _id } = req.user;
    const token = jsonwebtoken_1.default.sign({
        expiresIn: '12h',
        id: _id,
        username: username,
    }, secretOrKey);
    res.json({
        message: 'Login successful',
        data: {
            user: username,
            rooms: rooms,
            token: token,
        },
    });
};
exports.post_login_user = post_login_user;
const get_logout_user = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(400).json({ message: 'Logout unsuccessful' });
        }
        res.json({ message: 'Logout successful' });
    });
};
exports.get_logout_user = get_logout_user;
