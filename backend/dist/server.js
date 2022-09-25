"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
require("./config/mongoConfig");
require("dotenv/config");
const mongoose_1 = require("mongoose");
const http_1 = require("http");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {});
/* <-- Middleware --> */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/* <-- Routes --> */
/* <-- Server --> */
mongoose_1.connection.on('connected', () => {
    httpServer.listen(port, () => {
        console.log('Connect to DB and listening on port:', port);
    });
});
/* Web Sockets */
io.on('connection', (socket) => {
    console.log('Made socket connection', socket.id);
});
io.engine.on('connection_error', (err) => {
    const { req, code, message, context } = err;
    console.log(req);
    console.log(code);
    console.log(message);
    console.log(context);
});
