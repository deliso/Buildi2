const User = require('./../model/user.model');
import { Request, Response, NextFunction } from 'express';

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.session;
		const user = await User.findOne({ _id: id });
		if (!user) throw new Error();
		req.body.user = user;
		next();
	} catch (e) {
		res.status(404);
		res.end();
	}
};

module.exports = authMiddleware;
