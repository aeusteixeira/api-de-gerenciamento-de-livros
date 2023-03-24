import BookModel from '../models/Book.js';

class bookController {

	async store(request, response, next) {
		try {
			const author = await BookModel.create(request.body);
			return response.status(201).json(author);
		} catch (error) {
			next(error);
		}
	}

	async index(request, response, next) {
		try {
			const authors = await BookModel.find().populate('author').exec();
			return response.status(200).json(authors);
		} catch (error) {
			next(error);
		}
	}
      

	async show(request, response, next) {
		try {
			const author = await BookModel.findById(request.params.id).populate('author', 'name').exec();
			if (author) {
				return response.status(200).json(author);
			} else {
				return response.status(404).json({ message: 'livo não encontrado.' });
			}
		} catch (error) {
			next(error);
		}
	}
      

	async update(request, response, next) {
		try {
			const author = await BookModel.findByIdAndUpdate(request.params.id, request.body);
			response.status(200).json({ message: 'livo atualizado com sucesso', author });
		} catch (error) {
			next(error);
		}
	}
      

	async destroy(request, response, next){
		try {
			await BookModel.findByIdAndDelete(request.params.id);
			return response.status(200).json({message: 'livo excluído com sucesso!'});
		} catch (error) {
			next(error);
		}
	}

	async getAuthorsByCompanyPlublisher(request, response, next) {
		const editora = request.query.editora;
		try {
			const authors = await BookModel.find({publish_company: editora}).populate('author').exec();
			return response.status(200).json(authors);
		} catch (error) {
			next(error);
		}
	}
    
}

export default new bookController();