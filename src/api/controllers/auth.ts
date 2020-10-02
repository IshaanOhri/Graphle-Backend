import { Request, Response } from 'express';

const googleCallback = async (req: Request, res: Response) => {
	res.redirect('/dashboard');
};

const googleLogout = async (req: Request, res: Response) => {
	req.logout();
	res.redirect('/');
};

export { googleCallback, googleLogout };
