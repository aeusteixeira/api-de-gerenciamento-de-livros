import NotFound from '../errors/NotFoundError.js';

function handleNotFound(request, response, next) {
	const error = new NotFound();
	next(error);
}

export default handleNotFound;