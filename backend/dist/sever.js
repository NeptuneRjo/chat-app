"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/mongoConfig");
require("dotenv/config");
const mongoose_1 = require("mongoose");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
/* <-- Middleware --> */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/* <-- Routes --> */
/* <-- Server --> */
mongoose_1.connection.on('connected', () => {
    app.listen(port, () => {
        console.log('Connected to DB and listening on port:', port);
    });
});
