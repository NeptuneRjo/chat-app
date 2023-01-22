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
const http_1 = __importDefault(require("http"));
const routes_1 = require("./routes");
require("./config/mongoConfig");
require("./config/authStrategies");
require("dotenv/config");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: [
            'http://localhost:3000',
            'https://harmony-static.onrender.com',
            'https://chat-app-0iem.onrender.com',
            'http://localhost:10000',
        ],
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
        credentials: true,
    },
});
/* <-- Middleware --> */
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://harmony-static.onrender.com',
        'https://chat-app-0iem.onrender.com',
        'http://localhost:10000',
    ],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
    preflightContinue: true,
}));
// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*')
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept'
// 	)
// 	next()
// })
app.enable('trust proxy');
app.set('trust proxy', 1);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;
const MONGO_SESSION_URI = process.env.MONGO_SESSION_URI;
// app.use(
// 	session({
// 		secret: EXPRESS_SESSION_SECRET,
// 		resave: false,
// 		saveUninitialized: true,
// 		// cookie: {
// 		// 	sameSite: 'none',
// 		// 	secure: true,
// 		// domain: 'chat-app-0iem.onrender.com',
// 		// 	httpOnly: false,
// 		// },
// 		cookie: {
// 			sameSite: 'none',
// 			secure: true,
// 			// domain: 'chat-app-0iem.onrender.com',
// 		},
// 		store: MongoStore.create({
// 			mongoUrl: MONGO_SESSION_URI,
// 			autoRemove: 'interval',
// 			autoRemoveInterval: 10,
// 		}),
// 		// proxy: true,
// 	})
// )
app.use(passport_1.default.initialize());
// app.use(passport.session())
/* <-- Routes --> */
app.use('/api/auth', routes_1.authRoutes);
app.use('/api/chat', routes_1.chatRoutes);
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
