import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BookSchema = new Schema({
	id: ObjectId,
	title: {
		type: String,
		required: [true, 'O título do livro é obrigatório.'],
	},
	author: { 
		type: ObjectId,
		ref: 'authors',
		required: [true, 'O autor do livro é obrigatório.'],
	},
	publish_company: {
		type: String,
		required: [true, 'A editora do livro é obrigatória.'],
		enum: {
			values: [
				'Rocco',
				'Brasil Literatura',
			],
			message: ' A editora {VALUE} não é válida.'
		}
	},
	number_pages: {
		type: Number,
		min: [1, 'O livro deve ter pelo menos 1 página.'],
		max: [5000, 'O livro deve ter no máximo 1000 páginas.'],
		required: [true, 'O número de páginas do livro é obrigatório.'],
	}
});

const BookModel = mongoose.model('books', BookSchema);

export default BookModel;