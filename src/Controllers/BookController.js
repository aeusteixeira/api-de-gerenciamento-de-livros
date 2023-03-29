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
			const { editora, titulo, nomeAutor } = request.query;

			const search = {};

			if(editora) search.publish_company = editora;
			if(titulo) search.title = { $regex: titulo, $options: 'i'};

			if(nomeAutor){
				const author = AuthorModel.findOne({ name: nomeAutor });
				const authorId = author._id;
				search.author = authorId;
			}

			const data = await BookModel.find(search);
			response.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

}

export default new bookController();