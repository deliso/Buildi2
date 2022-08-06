"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectMongoose = () => mongoose_1.default.connect('mongodb://localhost:27017/solo', () => console.log('connected to mongoose'));
exports.connectMongoose = connectMongoose;
exports.default = mongoose_1.default;
