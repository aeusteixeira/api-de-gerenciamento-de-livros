import express from 'express';
import BookController from '../Controllers/BookController.js';

const router = express.Router();

router.get('/books', BookController.index);
router.post('/books', BookController.store);
router.get('/books/search', BookController.getBookByFilter);
router.get('/books/:id', BookController.show);
router.put('/books/:id', BookController.update);
router.delete('/books/:id', BookController.destroy);

export default router;