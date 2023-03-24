import mongoose from "mongoose";


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BookSchema = new Schema({
        id: ObjectId,
        title: String,
        author: { type: ObjectId, ref: 'authors' },
        publish_company: String,
        number_pages: Number
    });

const BookModel = mongoose.model('books', BookSchema)

export default BookModel;