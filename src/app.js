import express from 'express';
import Loaders from './config/index.js'; 
import routes from './routes/index.js';

const app = express();
Loaders.start();
routes(app);

export default app;