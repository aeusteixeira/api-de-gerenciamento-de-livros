import express from 'express';
import Loaders from './config/index.js'; 
import routes from './routes/index.js';
import handleError from './middlewares/handlerError.js';
import handleNotFound from './middlewares/handleNotFound.js';

const app = express();
Loaders.start();
routes(app);
app.use(handleNotFound);
app.use(handleError);

export default app;