"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Initial Vars
// Require
const express_1 = __importDefault(require("express"));
const model_1 = require("./model");
// import mongoose from 'mongoose';
const router_1 = __importDefault(require("./router"));
const PORT = 3000;
// const express = require("express");
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
// Set Up
const app = (0, express_1.default)();
// const corsConfig = {
// 	origin: 'http://localhost:3001',
// 	// origin: 'http://192.168.1.144:3001',
// 	credentials: true,
// };
// Middleware
// corsConfig needed for session
app.use(cors());
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
app.use(router_1.default);
// Await for mongoose connection
app.listen(PORT, () => console.log('server live'));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, model_1.connectMongoose)();
}))();
