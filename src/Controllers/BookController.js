import BookModel from "../models/Book.js";

class bookController {

    async store(request, response) {
        try {
          const author = await BookModel.create(request.body);
          return response.status(201).json(author);
        } catch (error) {
          return response.status(400).json({ message: 'Falha ao criar livo' });
        }
    }

    async index(request, response) {
        try {
          const authors = await BookModel.find().populate('author').exec();
          return response.status(200).json(authors);
        } catch (error) {
          return response.status(500).json({ message: "Erro ao buscar livros" });
        }
      }
      

      async show(request, response) {
        try {
          const author = await BookModel.findById(request.params.id).populate('author', 'name').exec();
          if (author) {
            return response.status(200).json(author);
          } else {
            return response.status(404).json({ message: "livo não encontrado." });
          }
        } catch (error) {
          return response.status(500).json({ message: "Ocorreu um erro ao buscar o livo." });
        }
      }
      

    async update(request, response) {
        try {
          const author = await BookModel.findByIdAndUpdate(request.params.id, request.body);
          response.status(200).json({ message: "livo atualizado com sucesso", author });
        } catch (error) {
          response.status(404).json({ message: "Falha ao atualizar livo" });
        }
      }
      

      async destroy(request, response){
        try {
            await BookModel.findByIdAndDelete(request.params.id);
            return response.status(200).json({message: "livo excluído com sucesso!"});
        } catch (error) {
            return response.status(404).json({message: "Falha ao excluir o livo."});
        }
    }

    async getAuthorsByCompanyPlublisher(request, response) {
        const editora = request.query.editora;

        try {
            const authors = await BookModel.find({publish_company: editora}).populate('author').exec();
            return response.status(200).json(authors);
        } catch (error) {
            return response.status(500).json({ message: "Erro ao buscar livros" });
        }
      }
    
}

export default new bookController();