"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatControllers_1 = require("../controllers/chatControllers");
const router = (0, express_1.Router)();
router.route('/:id').get(chatControllers_1.get_room).delete(chatControllers_1.delete_room).patch(chatControllers_1.post_new_message);
router.route('/new-room').post(chatControllers_1.post_new_room);
exports.default = router;
