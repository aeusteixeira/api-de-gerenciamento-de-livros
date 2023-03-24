import ServerError from './ServerError.js';

class ValidationError extends ServerError {
	constructor(error) {
		
		const errorsMessages = Object.values(error.errors)
			.map((error) => error.message)
			.join('; ');

		const message = `Os seguintes erros foram encontrados: ${errorsMessages}`;
		super(message);
	}
}

export default ValidationError;