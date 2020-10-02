import { Router } from 'express';
import { createChannel, reciteStory, joinChannel, leaveChannel } from '../controllers/channel';

const channelRouter: Router = Router();

// @desc	Create channel
// @route	POST /channel/create
channelRouter.post('/create', createChannel);

// @desc	Recite story
// @route	POST /channel/recite
channelRouter.post('/recite', reciteStory);

// @desc	Join channel
// @route	GET /channel/join?channelID=&participantID=
channelRouter.get('/join', joinChannel);

// @desc	Leave channel
// @route	GET /channel/leave?channelID=&participantID=
channelRouter.get('/leave', leaveChannel);

export default channelRouter;
