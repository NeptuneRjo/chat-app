"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = require("mongoose");
(0, mongoose_1.connect)(`${process.env.MONGO_URI}`);
mongoose_1.connection.on('error', console.error.bind(console, 'Mongo connection error'));
