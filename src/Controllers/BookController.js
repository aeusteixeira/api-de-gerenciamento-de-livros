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
			let { limite = 5,
				pagina = 1,
				order_by = '_id',
				order = -1,
			} = request.query;

			limite = parseInt(limite);
			pagina = parseInt(pagina);
			order = parseInt(order);


			if(limite > 0 && pagina > 0){
				const authors = await BookModel.find()
					.sort({ [order_by]: order })
					.skip((parseInt(pagina) - 1) * parseInt(limite))
					.limit(parseInt(limite))
					.populate('author')
					.exec();

				return response.status(200).json(authors);
			}else{
				next(new NotFoundError('Um ou mais parâmetros de paginação estão incorretos'));
			}
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

			// Tratar os dados de entrada
			const { editora, titulo, autor, max_paginas, min_paginas } = request.query;

			let search = {};

			if(editora) search.publish_company = editora;
			if(titulo) search.title = { $regex: titulo, $options: 'i'};

			if (min_paginas || max_paginas) search.num_pages = {};

			// gte = Greater Than or Equal = Maior ou igual que
			if (min_paginas) search.num_pages.$gte = min_paginas;
			// lte = Less Than or Equal = Menor ou igual que
			if (max_paginas) search.num_pages.$lte = max_paginas;

			if(autor){
				const author = await AuthorModel.findOne({ name: autor });

				if(author !== null){
					search.author = author._id;
				}else{
					search = null;
				}
			}

			if(search !== null){
				// Buscar os dados no banco
				const data = await BookModel.find(search)
					.populate('author');
				response.status(200).send(data);
			}else{
				response.status(200).send([]);
			}
		} catch (error) {
			next(error);
		}
	}

}

export default new bookController();