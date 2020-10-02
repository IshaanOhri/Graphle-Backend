import cryptoRandomString from 'crypto-random-string';
import { Request, Response } from 'express';
import Pusher from 'pusher';

const pusher = new Pusher({
	appId: String(process.env.PUSHER_APP_ID),
	key: String(process.env.PUSHER_KEY),
	secret: String(process.env.PUSHER_SECRET),
	cluster: String(process.env.PUSHER_CLUSTER),
	useTLS: true
});

const pusherAuth = async (req: Request, res: Response) => {
	const socketId = req.body.socket_id;
	const channel = req.body.channel_name;
	const presenceData = {
		user_id: cryptoRandomString({ length: 6, type: 'distinguishable' }),
		user_info: {
			name: cryptoRandomString({ length: 6, type: 'distinguishable' }),
			twitter_id: cryptoRandomString({ length: 6, type: 'distinguishable' })
		}
	};
	const auth = pusher.authenticate(socketId, channel, presenceData);
	res.send(auth);
};

export { pusherAuth };
