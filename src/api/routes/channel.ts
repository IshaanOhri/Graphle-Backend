import { Router } from 'express';
import { createChannel, reciteStory } from '../controllers/channel';

const channelRouter: Router = Router();

// @desc	Create channel
// @route	POST /channel/create
channelRouter.post('/create', createChannel);

// @desc	Recite story
// @route	POST /channel
channelRouter.post('/', reciteStory);

export default channelRouter;
