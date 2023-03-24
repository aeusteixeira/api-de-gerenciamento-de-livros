import mongoose from 'mongoose';
import ServerError from '../errors/ServerError.js';
import RequestError from '../errors/RequestError.js';
import ValidationError from '../errors/ValidationError.js';
import NotFoundError from '../errors/NotFoundError.js';

// eslint-disable-next-line no-unused-vars
function handleError(error, request, response, next) {
	if(error instanceof mongoose.Error.CastError) {
		new RequestError().submiteResponse(response);
	}else if(error instanceof mongoose.Error.ValidationError) {
		new ValidationError(error).submiteResponse(response);
	}else if(error instanceof NotFoundError){
		error.submiteResponse(response);
	}else{
		new ServerError().submiteResponse(response);
	}
}

export default handleError;