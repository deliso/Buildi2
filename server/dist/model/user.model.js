"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require("./index");
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const reviewSchema = new Schema({
    rating: Number,
    review: String,
    creatorFirstName: String,
    creatorLastName: String,
    creatorPic: String,
});
const userSchema = new mongoose_1.default.Schema({
    profilePic: String,
    email: String,
    password: String,
    userType: String,
    firstName: String,
    lastName: String,
    location: String,
    specialties: [String],
    reviews: [reviewSchema],
});
exports.default = mongoose_1.default.model('User', userSchema);
// module.exports = mongoose.model('User', userSchema);
