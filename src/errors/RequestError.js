import ServerError from './ServerError.js';
class RequestError extends ServerError {
	constructor(message = 'Um ou mais dados fornecidos estão incorretos.', status = 400) {
		super(message, status);
	}
}

export default RequestError;