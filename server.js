import app from './src/app.js';
import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`O servidor está aberto na porta: http://localhost:${port}`);
});