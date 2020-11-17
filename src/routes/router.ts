import express from 'express';
import messages from './messages.route';

let app: express.Application = express();

app.use(messages);

export default app;