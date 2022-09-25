"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/signup').post((req, res) => res.send('POST signup'));
router.route('/login').post((req, res) => res.send('POST login'));
router.route('/logout').post((req, res) => res.send('POST logout'));
exports.default = router;
