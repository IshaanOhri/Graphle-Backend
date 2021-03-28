/* eslint-disable camelcase */
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { client_email, GOOGLE_CLOUD_PROJECT_ID, private_key } from './env';

const client = new TextToSpeechClient({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    credentials: {
        client_email,
        private_key: private_key.replace(/\\n/g, '\n')
    }
});

export { client };
