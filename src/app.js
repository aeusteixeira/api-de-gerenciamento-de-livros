import express from 'express';
import Loaders from './config/index.js'; 
import routes from './routes/index.js';
import handleError from './middlewares/handlerError.js';

const app = express();
Loaders.start();
routes(app);

app.use(handleError);

export default app;