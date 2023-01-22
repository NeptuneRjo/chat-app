"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatControllers_1 = require("../controllers/chatControllers");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router
    .route('/room/:id')
    .get(chatControllers_1.get_room)
    .delete(passport_1.default.authenticate('jwt', { session: false }), chatControllers_1.delete_room)
    .patch(passport_1.default.authenticate('jwt', { session: false }), chatControllers_1.patch_new_message);
router
    .route('/join-room/:id')
    .patch(passport_1.default.authenticate('jwt', { session: false }), chatControllers_1.patch_join_room);
router
    .route('/create-room')
    .post(passport_1.default.authenticate('jwt', { session: false }), chatControllers_1.post_new_room);
exports.default = router;
