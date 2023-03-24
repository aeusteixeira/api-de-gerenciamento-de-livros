import express from 'express';
import books from './books.js';
import authors from './authors.js';

const routes = (app) => {

	app.route('/').get((request, response) => {
		response.send('Hello World');
	});

	app.use(
		express.json(),
		books,
		authors
	);

};

export default routes;