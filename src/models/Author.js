import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AuthorSchema = new Schema({
	id: ObjectId,
	name: {
		type: String,
		required: [true, 'O nome do autor é obrigatório.'],
	}
},
{
	versionKey: false
}
);

const AuthorModel = mongoose.model('authors', AuthorSchema);

export default AuthorModel;