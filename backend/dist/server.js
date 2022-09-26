"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const socket_io_1 = require("socket.io");
const mongoose_1 = require("mongoose");
const http_1 = require("http");
const routes_1 = require("./routes");
require("./config/mongoConfig");
require("dotenv/config");
require("./config/passport");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {});
/* <-- Middleware --> */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
/* <-- Routes --> */
app.use('/auth', routes_1.auth);
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
