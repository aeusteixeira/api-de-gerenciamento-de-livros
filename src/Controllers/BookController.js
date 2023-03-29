import NotFoundError from '../errors/NotFoundError.js';
import BookModel from '../models/Book.js';
import AuthorModel from '../models/Author.js';

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
				next(new NotFoundError('Livo não encontrado'));
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

	async getBookByFilter(request, response, next) {
		try {
			const search = await this.handleFilter(request.query);
			console.log(search);
		} catch (error) {
			next(error);
		}
	}

	async handleFilter(params) {
		const { editora, titulo, autor, min_paginas, max_paginas } = params;
		let search = {};

		if(editora) search.publish_company = editora;
		if(titulo) search.title = { $regex: titulo, $options: 'i'};
		if(min_paginas || max_paginas) search.pages = {};

		if(autor){
			const author = await AuthorModel.findOne({ name: autor });
			search.author = author._id;
		}

		return search;
	}

}

export default new bookController();