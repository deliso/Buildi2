import mongoose from 'mongoose';

export const connectMongoose = () =>
	mongoose.connect('mongodb://localhost:27017/solo', () =>
		console.log('connected to mongoose')
	);

export default mongoose;
