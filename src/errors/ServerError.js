class ServerError extends Error {
	constructor(message = 'Erro interno do servidor', status = 500) {
		super(message);
		this.message = message;
		this.status = status;
	}

	submiteResponse(response) {
		return response.status(this.status).json({
			message: this.message,
			status: this.status
		});
	}
}

export default ServerError;