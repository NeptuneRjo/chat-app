"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const socket_io_1 = require("socket.io");
const mongoose_1 = require("mongoose");
const http_1 = require("http");
const routes_1 = require("./routes");
const express_session_1 = __importDefault(require("express-session"));
require("./config/mongoConfig");
require("dotenv/config");
require("./config/passport");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: [
            'http://localhost:3000',
            'https://harmony-45tv.onrender.com',
            'https://chat-app-0iem.onrender.com',
        ],
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
        credentials: true,
    },
});
/* <-- Middleware --> */
const allowedOrigins = [
    'http://localhost:3000',
    'https://harmony-45tv.onrender.com',
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
}));
app.enable('trust proxy');
app.set('trust proxy', 1);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'none',
        secure: true,
    },
}));
app.use(passport_1.default.session());
app.use(passport_1.default.initialize());
/* <-- Routes --> */
app.use('/auth', routes_1.authRoutes);
app.use('/chat', routes_1.chatRoutes);
/* <-- Server --> */
mongoose_1.connection.on('connected', () => {
    httpServer.listen(port, () => {
        console.log('Connect to DB and listening on port:', port);
    });
});
/* Web Sockets */
io.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.join(room);
    });
    socket.on('leave', (room) => {
        socket.leave(room);
    });
    socket.on('chat', (data) => {
        io.to(data.id).emit('chat', data.messages);
    });
});
io.engine.on('connection_error', (err) => {
    const { req, code, message, context } = err;
    console.log(req);
    console.log(code);
    console.log(message);
    console.log(context);
});
