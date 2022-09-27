"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .route('/:id')
    .get((req, res) => res.send(`GET all messages in room:${req.params.id}`))
    .patch((req, res) => res.send('PATCH new room'))
    .delete((req, res) => res.send('DELETE room'));
router.route('/new-room').post((req, res) => res.send('POST new room'));
exports.default = router;
