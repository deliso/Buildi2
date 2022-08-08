// 'use strict';

import { Request, Response } from 'express';
import Project from '../model/project.model';
import User from '../model/user.model';
// import session from 'express-session';
import { Review, UserT } from '../../types/userTypes';
import { Bid, RFI, ProjectT } from '../../types/projectTypes';

declare module 'express-session' {
	export interface SessionData {
		uid: string;
	}
}

const bcrypt = require('bcrypt');

// 1. Creates a new project
const postProject = async (req: Request, res: Response) => {
	console.log(req.body._id);
	try {
		await Project<ProjectT>.create({
			projectImage: req.file?.path,
			name: req.body.name,
			description: req.body.description,
			userId: req.body._id,
			specialties: req.body.specialties.split(','),
			lifeCycle: 'open',
			bids: [],
			rfis: [],
		});
		res.status(202);
		res.send('success!');
	} catch (e) {
		res.status(504);
		console.log(e);
	}
};
// 2. Return lists of all projects (WORKS)
const returnProjects = async (req: Request, res: Response) => {
	try {
		const projects: ProjectT[] = await Project.find();
		res.status(200).send(projects);
	} catch (e) {
		res.status(505).send(e);
	}
};

// 3. Return list of projects specific to a user
const returnProjectsById = async (req: Request, res: Response) => {
	try {
	} catch (e) {
		res.status(505).send(e);
	}
};

const returnOneProject = async (req: Request, res: Response) => {
	try {
		console.log(req.query.id);
		const project: ProjectT = await Project.findById(req.query.id);
		return res.status(200).send(project);
	} catch (e) {
		res.status(505).send(e);
	}
	return 'Project not found';
};

// 4. BIDS
const addBid = async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		const projectToUpdate: Bid = await Project.findByIdAndUpdate(
			req.body?._id,
			{
				$push: {
					bids: {
						bidPrice: req.body?.bidPrice,
						creatorId: req.body?.creatorId,
						creatorName: req.body?.creatorName,
						creatorPic: req.body?.creatorPic,
						awarded: false,
					},
				},
			},
			{ new: true }
		);
		res.status(200).send(projectToUpdate);
	} catch (e) {
		res.status(505).send(e);
	}
};

// 5. Updates a bid
const changeBid = async (req: Request, res: Response) => {
	try {
		const projectToUpdate: ProjectT = await Project.findOneAndUpdate(
			{ _id: req.body._id, 'bids.creatorId': req.body.creatorId },
			{
				$set: {
					'bids.$.bidPrice': req.body.bidPrice,
				},
			},
			{ new: true }
		);
		res.status(200).send(projectToUpdate);
	} catch (e) {
		res.status(505).send(e);
	}
};
// 6. will update awarded bid status and also set project life cycle to awarded
const awardBid = async (req: Request, res: Response) => {
	try {
		let projectToUpdate: ProjectT = await Project.findOneAndUpdate(
			{ _id: req.body._id, 'bids.creatorId': req.body.creatorId },
			{
				$set: {
					'bids.$.awarded': true,
				},
			},
			{ new: true }
		);

		projectToUpdate = await Project.findOneAndUpdate(
			{ _id: req.body._id },
			{
				$set: {
					lifeCycle: 'awarded',
				},
			},
			{ new: true }
		);
		res.status(200).send(projectToUpdate);
	} catch (e) {
		res.status(505).send(e);
	}
};

// 7. RFIS
const addRFI = async (req: Request, res: Response) => {
	try {
		const projectToUpdate: ProjectT = await Project.findByIdAndUpdate(
			req.body._id,
			{
				$push: {
					rfis: {
						question: req.body.question,
						response: '',
						creatorId: req.body.creatorId,
						creatorPic: req.body.creatorPic,
					},
				},
			},
			{ new: true }
		);
		res.status(200).send(projectToUpdate);
	} catch (e) {
		res.status(505).send(e);
	}
};

const respondRFI = async (req: Request, res: Response) => {
	try {
		const projectToUpdate: ProjectT = await Project.findOneAndUpdate(
			{ _id: req.body._id, 'rfis._id': req.body.rfiId },
			{
				$set: {
					'rfis.$.response': req.body.response,
				},
			},
			{ new: true }
		);
		res.status(200).send(projectToUpdate);
	} catch (e) {
		res.status(505).send(e);
	}
};

// 8. USER FUNCTIONS
// <any, any, UserT>
const createReview = async (req: Request, res: Response) => {
	try {
		// first leave the review
		const userToLeaveReviewOn: UserT | null = await User.findByIdAndUpdate(
			req.body.bidderId,
			{
				$push: {
					reviews: {
						rating: req.body.rating,
						review: req.body.review,
						creatorFirstName: req.body.creatorFirstName,
						creatorLastName: req.body.creatorLastName,
						creatorPic: req.body.creatorPic,
					},
				},
			},
			{ new: true }
		);
		// next change the project status to closed
		// const projectToClose = await Project.findOneAndUpdate(
		// 	{ _id: req.body.projectId },
		// 	{
		// 		$set: {
		// 			lifeCycle: 'closed',
		// 		},
		// 	},
		// 	{ new: true }
		// );

		res.status(200).send(userToLeaveReviewOn);
	} catch (e) {
		res.status(505).send(e);
	}
};
// 9. Creates user
const createUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user: UserT | null = await User.findOne({ email });
	if (user) {
		return res
			.status(409)
			.send({ error: '409', message: 'User already exists =(' });
	}
	try {
		if (password === '') throw new Error();
		const hash = await bcrypt.hash(password, 10);
		const newUser = new User({
			...req.body,
			profilePic: req.file?.path,
			specialties: req.body.specialties.split(','),
			reviews: [],
			password: hash,
		});

		const user1 = await newUser.save();

		req.session.uid = user1._id;
		res.status(201).send(user1);
	} catch (error) {
		res
			.status(400)
			.send({ error, message: 'Error, could not create a new user =(' });
	}
	return 'Error, could not create a new user =(';
};

//10. Login
const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user: UserT | null = await User.findOne({ email });
		const validatedPass = await bcrypt.compare(password, user?.password);

		if (!validatedPass) throw new Error();
		req.session.uid = user!._id;
		res.status(200).send(user);
	} catch (error) {
		console.log(error);

		res
			.status(401)
			.send({ error: '401', message: 'Username or password is incorrect' });
	}
};
// 11. This version uses auth middleware for logged in user
const profile = async (req: Request, res: Response) => {
	try {
		const user = { ...req.body.user };
		res.status(200).send(user[0]);
	} catch (error) {
		res.status(404).send({ error, message: 'User not found' });
	}
};

// This version is to obtain profile details of another user, without changing the authorized user (to view someone elses profile)
// 12. UPDATE LATER SO YOU DO NOT SEND BACK ANY SENSITIVE INFO (IF YOU HAVE TIME)
const getOtherProfile = async (
	req: Request<any, any, UserT>,
	res: Response
) => {
	try {
		const otherUser: UserT | null = await User.findById(req.query.id);
		res.status(200).send(otherUser);
	} catch (error) {
		res.status(404).send({ error, message: 'User not found' });
	}
};

const logout = (req: Request, res: Response) => {
	req.session.destroy((error) => {
		if (error) {
			res
				.status(500)
				.send({ error, message: 'Could not log out, please try again' });
		} else {
			res.clearCookie('sid');
			res.status(200).send({ message: 'Logout successful' });
		}
	});
};

export default {
	postProject,
	returnProjects,
	returnProjectsById,
	returnOneProject,
	addBid,
	changeBid,
	awardBid,
	addRFI,
	respondRFI,
	createUser,
	login,
	profile,
	getOtherProfile,
	logout,
	createReview,
};
