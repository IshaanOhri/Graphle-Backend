/* eslint-disable no-await-in-loop */
import { query, Request, Response } from 'express';
import cryptoRandomString from 'crypto-random-string';
import Pusher from 'pusher';
import Channel from '../../modals/Channel';
import { code, message } from '../../config/messages';
import { ChannelInterface } from '../../interfaces/Channel';
import logger from '../../logger/config';

const pusher = new Pusher({
	appId: String(process.env.PUSHER_APP_ID),
	key: String(process.env.PUSHER_KEY),
	secret: String(process.env.PUSHER_SECRET),
	cluster: String(process.env.PUSHER_CLUSTER),
	useTLS: true
});

const createChannel = async (req: Request, res: Response) => {
	if (!req.body.channelName || !req.body.instructorName) {
		res.status(404).send({
			success: false,
			code: code.wrongParameters,
			message: message.wrongParameters
		});
		return;
	}

	let channelID = '';

	let unique: boolean = false;

	while (!unique) {
		channelID = cryptoRandomString({ length: 6, type: 'distinguishable' });
		const exist = await Channel.findOne({ channelID });
		if (!exist) {
			unique = true;
		}
	}

	const channelInfo: ChannelInterface = {
		channelID,
		channelName: req.body.channelName,
		instructorName: req.body.instructorName,
		participantIDs: []
	};

	try {
		await Channel.create(channelInfo);
	} catch (err) {
		logger.error(err);
		res.status(500).send({
			success: false,
			code: code.channelCreation,
			message: message.channelCreation
		});
		return;
	}

	res.send({
		success: true,
		channelInfo: {
			channelID: channelInfo.channelID,
			channelName: channelInfo.channelName,
			instructorName: channelInfo.instructorName
		}
	});
};

const reciteStory = async (req: Request, res: Response) => {
	if (!req.body.channelID || !req.body.query) {
		res.status(404).send({
			success: false,
			code: code.wrongParameters,
			message: message.wrongParameters
		});
		return;
	}

	// SEND QUERY TO DL MODEL

	const urls = [req.body.query, req.body.query];

	// Send to all active connections
	try {
		pusher.trigger(`presence-RKT4MM`, 'my-event', {
			message: urls
		});
	} catch (err) {
		logger.error(err);
		res.status(500).send({
			success: false,
			code: code.transmission,
			message: message.transmission
		});
		return;
	}

	res.send({
		success: true,
		urls
	});
};

export { createChannel, reciteStory };
