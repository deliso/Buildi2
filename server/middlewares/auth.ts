import User from '../model/user.model';
import { Request, Response, NextFunction } from 'express';

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { uid } = req.session;
		const user = await User.find({ _id: uid });
		if (!user) throw new Error();
		req.body.user = user;
		next();
	} catch (e) {
		res.status(404);
		res.end();
	}
};

module.exports = authMiddleware;
