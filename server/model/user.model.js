"use strict";
exports.__esModule = true;
// const mongoose = require("./index");
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var reviewSchema = new Schema({
    rating: Number,
    review: String,
    creatorFirstName: String,
    creatorLastName: String,
    creatorPic: String
});
var userSchema = new mongoose_1["default"].Schema({
    profilePic: String,
    email: String,
    password: String,
    userType: String,
    firstName: String,
    lastName: String,
    location: String,
    specialties: [String],
    reviews: [reviewSchema]
});
exports["default"] = mongoose_1["default"].model('User', userSchema);
// module.exports = mongoose.model('User', userSchema);
