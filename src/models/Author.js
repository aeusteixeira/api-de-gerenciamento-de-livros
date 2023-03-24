import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AuthorSchema = new Schema({
	id: ObjectId,
	name: String,
},
{
	versionKey: false
}
);

const AuthorModel = mongoose.model('authors', AuthorSchema);

export default AuthorModel;