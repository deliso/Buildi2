import User from '../model/user.model';
import { Request, Response, NextFunction } from 'express';
var ObjectId = require('mongoose').Types.ObjectId;

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log('middleware');

	try {
		const { uid } = req.session;
		console.log(uid);
		const user = await User.find({ _id: uid });
		console.log(user);
		if (!user) throw new Error();
		req.body.user = user;
		next();
	} catch (e) {
		res.status(404);
		res.end();
	}
};

module.exports = authMiddleware;
