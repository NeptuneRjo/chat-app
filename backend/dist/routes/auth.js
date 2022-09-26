"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};
// Login and/or Signup
router.get('/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/logout', (req, res, next) => {
    req.session.destroy(() => {
        console.log(req.user);
        res.send('Goodbye');
    });
});
router.get('/google/callback', passport_1.default.authenticate('google'), (req, res) => {
    if (req.user) {
        res.send(200).json({ data: req.user });
    }
    else {
        res.send(400).json({ error: 'Unable to log in at this time' });
    }
});
router.get('/failure', (req, res) => {
    res.send('something went wrong');
});
exports.default = router;
