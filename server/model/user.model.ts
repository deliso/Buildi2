// const mongoose = require("./index");
import mongoose, { model } from 'mongoose';
import { Review, UserT } from '../../types/userTypes';

const { Schema } = mongoose;

const reviewSchema = new Schema<Review>({
	rating: Number,
	review: String,
	creatorFirstName: String,
	creatorLastName: String,
	creatorPic: String,
});

const userSchema = new mongoose.Schema<UserT>({
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

const User = model('User', userSchema);
export default User;
module.exports = model('User', userSchema);
