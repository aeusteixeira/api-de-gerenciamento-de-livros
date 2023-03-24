import mongoose from 'mongoose';

// eslint-disable-next-line no-unused-vars
function handleError(error, requisition, response, next) {
	if(error instanceof mongoose.Error.CastError) {
		return response.status(400).json({ message: 'Um ou mais dados fornecidos estão incorretos.' });
	}else if(error instanceof mongoose.Error.ValidationError) {
		const errorsMessages = Object.values(error.errors)
			.map((error) => error.message).join('; ');
		response.status(400).send({
			message: `Os seguintes erros foram encontrados: ${errorsMessages}`
		});
	}else{
		return response.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
	}
}

export default handleError;