"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Initial Vars
// Require
const express_1 = __importDefault(require("express"));
// import mongoose from 'mongoose';
const PORT = 3000;
// const express = require("express");
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./router');
// Set Up
const app = (0, express_1.default)();
const corsConfig = {
    // origin: "http://localhost:3001",
    origin: 'http://192.168.1.144:3001',
    credentials: true,
};
// Middleware
// corsConfig needed for session
app.use(cors(corsConfig));
app.use('/uploads', express_1.default.static('uploads'));
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
// session set up
app.use(session({
    // the store property, if not specified, defaults to the in-memory store
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: true,
        httpOnly: false,
        // we would want to set secure=true in a production environment
        secure: false,
    },
}));
app.use(router);
app.listen(PORT, () => {
    console.log(`app listening at http//localhost:${PORT}`);
});
