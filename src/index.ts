/* eslint-disable import/first */
require('newrelic');

import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from './logger/config';

const app = express();

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// PORT and HOST initialization
const PORT: number = Number(process.env.PORT);
const HOST: string = String(process.env.HOST);

// Morgan configuration
app.use(
	morgan((tokens, req: Request, res: Response) => {
		logger.info(
			`Method: ${tokens.method(req, res)} URL: ${tokens.url(req, res)} Status: ${tokens.status(req, res)} Resp Time: ${tokens['response-time'](
				req,
				res
			)} ms`
		);
		return null;
	})
);

// Default route
app.use('*', (req: Request, res: Response) => {
	res.redirect('/');
});

app.listen(PORT, HOST, () => {
	logger.info(`Graphle server listening on http://${HOST}:${PORT}`);
});
