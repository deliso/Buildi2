// const mongoose = require("./index");
import mongoose from 'mongoose';
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

export default mongoose.model('User', userSchema);
// module.exports = mongoose.model('User', userSchema);
