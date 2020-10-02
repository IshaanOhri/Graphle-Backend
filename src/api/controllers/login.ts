import { Request, Response } from 'express';
import logger from '../../logger/config';
import Story from '../../modals/Story';

const login = async (req: Request, res: Response) => {
	res.render('login', {
		layout: 'login'
	});
};

const dashboard = async (req: Request, res: Response) => {
	const user: any = req.user!;

	try {
		const stories = await Story.find({ user: user.id }).lean();
		res.render('dashboard', {
			name: user.firstName,
			stories
		});
	} catch (err) {
		logger.error(err);
		res.render('error/500');
	}
};

export { login, dashboard };
