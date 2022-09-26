"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
const isLoggedIn = (req, res, next) => {
    console.log(req.user);
    req.user ? next() : res.sendStatus(401);
};
router.route('/signup').post((req, res) => res.send('POST signup'));
router.route('/login').post((req, res) => res.send('POST login'));
router.route('/logout').post((req, res) => res.send('POST logout'));
router
    .route('/')
    .get((req, res) => res.send('<a href="/auth/google">Authenticate with Google</a>'));
router.route('/protected').get(isLoggedIn, (req, res) => {
    res.send(`Hello!`);
});
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', passport_1.default.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
}));
router.get('/auth/failure', (req, res) => {
    res.send('something went wrong');
});
router.get('/logout', (req, res, next) => {
    req.session.destroy(() => {
        console.log(req.user);
        res.send('Goodbye');
    });
});
exports.default = router;
