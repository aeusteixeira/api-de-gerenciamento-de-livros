import ServerError from './ServerError.js';

class NotFoundError extends ServerError {
	constructor(message = 'Página não encontrada'){
		super(message, 404);
	}
}

export default NotFoundError;