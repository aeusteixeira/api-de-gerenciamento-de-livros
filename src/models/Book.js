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
	},
	number_pages: Number
});

const BookModel = mongoose.model('books', BookSchema);

export default BookModel;