import mongoose, { model } from 'mongoose';
import { BidT, RFIT, ProjectT } from '../../types/projectTypes';

const { Schema } = mongoose;

const bidSchema = new Schema<BidT>({
	bidPrice: Number,
	creatorId: String,
	creatorName: String,
	creatorPic: String,
	awarded: Boolean,
});

const RFISchema = new Schema<RFIT>({
	question: String,
	response: String,
	creatorId: String,
	creatorPic: String,
});

const projectSchema = new Schema<ProjectT>({
	projectImage: {
		type: String,
		required: false,
	},
	name: String,
	description: String,
	userId: String,
	specialties: [String],
	lifeCycle: String,
	bids: [bidSchema],
	rfis: [RFISchema],
});

const Project = mongoose.model('project', projectSchema);

export default Project;
