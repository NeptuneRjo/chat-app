"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authControllers_1 = require("../controllers/authControllers");
const router = (0, express_1.Router)();
router.get('/logout', authControllers_1.get_logout_user);
router.post('/login', passport_1.default.authenticate('local', { session: false }), authControllers_1.post_login_user);
router.post('/register', authControllers_1.post_register_user);
exports.default = router;
