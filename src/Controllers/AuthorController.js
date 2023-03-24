import NotFoundError from '../errors/NotFoundError.js';
import AuthorModel from '../models/Author.js';

class AuthorController {

	async store(request, response, next) {
		try {
			const author = await AuthorModel.create(request.body);
			return response.status(201).json(author);
		} catch (error) {
			next(error);
		}
	}

	async index(request, response, next) {
		try {
			const authors = await AuthorModel.find();
			return response.status(200).json(authors);
		} catch (error) {
			next(error);
		}
	}
      

	async show(request, response, next) {
		try {
			const author = await AuthorModel.findById(request.params.id);
			if (author) {
				return response.status(200).json(author);
			} else {
				next(new NotFoundError('Autor não encontrado'));
			}
		} catch (error) {
			next(error);
		}
	}
      

	async update(request, response, next) {
		try {
			const author = await AuthorModel.findByIdAndUpdate(request.params.id, request.body);
			response.status(200).json({ message: 'Autor atualizado com sucesso', author });
		} catch (error) {
			next(error);
		}
	}
      

	async destroy(request, response, next){
		try {
			await AuthorModel.findByIdAndDelete(request.params.id);
			return response.status(200).json({message: 'Autor excluído com sucesso!'});
		} catch (error) {
			next(error);
		}
	} 
    
}

export default new AuthorController();