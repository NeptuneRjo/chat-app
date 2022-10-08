"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const router = (0, express_1.Router)();
const REDIRECT_URL = process.env.REDIRECT_URL;
const JWT_SECRET_PROD = process.env.JWT_SECRET_PROD;
const JWT_SECRET_DEV = process.env.JWT_SECRET_DEV;
// Login and/or Signup
router.get('/google', passport_1.default.authenticate('google', {
    scope: ['email', 'profile'],
    session: false,
}));
router.get('/logout', (req, res, next) => {
    res.status(200).json({ data: undefined });
});
router.get('/google/callback', passport_1.default.authenticate('google', {
    session: false,
    failureRedirect: REDIRECT_URL,
}), (req, res) => {
    const { _id, googleId, displayName } = req.user;
    const token = jsonwebtoken_1.default.sign({
        expiresIn: '12h',
        id: _id,
        googleId: googleId,
        displayName: displayName,
    }, JWT_SECRET_DEV);
    res.cookie('x-auth-cookie', token).redirect(REDIRECT_URL);
});
router.get('/login', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ data: req.user });
});
router.get('/failure', (req, res) => {
    res.send('something went wrong');
});
exports.default = router;
