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

<<<<<<< HEAD
const Project = mongoose.model('project', projectSchema);

export default Project;
// module.exports.Project = mongoose.model('project', projectSchema);
=======
const Project = model('Project', projectSchema);
export default Project;


>>>>>>> ae89e6fc7487d1590b384eaba51e86d2c59e100f
