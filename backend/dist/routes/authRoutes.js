"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
require("dotenv/config");
const router = (0, express_1.Router)();
const REDIRECT_URL = process.env.REDIRECT_URL;
// Login and/or Signup
router.get('/google', passport_1.default.authenticate('google', {
    scope: ['email', 'profile'],
}));
router.get('/logout', (req, res, next) => {
    req.session.destroy(() => {
        res.status(200).json({ data: req.user });
    });
});
router.get('/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/auth/failure',
}), (req, res) => {
    console.log(req.user);
    res.redirect(REDIRECT_URL);
});
router.get('/login', (req, res) => {
    res.status(200).json({ data: req.user });
});
router.get('/failure', (req, res) => {
    res.send('something went wrong');
});
exports.default = router;
