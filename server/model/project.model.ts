import mongoose, { model } from 'mongoose';
import { Bid, RFI, ProjectT } from '../../types/projectTypes';

const { Schema } = mongoose;

const bidSchema = new Schema<Bid>({
	bidPrice: Number,
	creatorId: String,
	creatorName: String,
	creatorPic: String,
	awarded: Boolean,
});

const RFISchema = new Schema<RFI>({
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

const Project = model('Project', projectSchema);
export default Project;


