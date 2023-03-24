import AuthorModel from '../models/Author.js';

class AuthorController {

	async store(request, response) {
		try {
			const author = await AuthorModel.create(request.body);
			return response.status(201).json(author);
		} catch (error) {
			return response.status(400).json({ message: 'Falha ao criar autor' });
		}
	}

	async index(request, response) {
		try {
			const authors = await AuthorModel.find();
			return response.status(200).json(authors);
		} catch (error) {
			return response.status(500).json({ message: 'Erro ao buscar autores' });
		}
	}
      

	async show(request, response) {
		try {
			const author = await AuthorModel.findById(request.params.id);
			if (author) {
				return response.status(200).json(author);
			} else {
				return response.status(404).json({ message: 'Autor não encontrado.' });
			}
		} catch (error) {
			return response.status(500).json({ message: 'Ocorreu um erro ao buscar o autor.' });
		}
	}
      

	async update(request, response) {
		try {
			const author = await AuthorModel.findByIdAndUpdate(request.params.id, request.body);
			response.status(200).json({ message: 'Autor atualizado com sucesso', author });
		} catch (error) {
			response.status(404).json({ message: 'Falha ao atualizar autor' });
		}
	}
      

	async destroy(request, response){
		try {
			await AuthorModel.findByIdAndDelete(request.params.id);
			return response.status(200).json({message: 'Autor excluído com sucesso!'});
		} catch (error) {
			return response.status(404).json({message: 'Falha ao excluir o autor.'});
		}
	} 
    
}

export default new AuthorController();