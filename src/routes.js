import { Router } from 'express';
import BookController from './Controllers/BookController.js';
import AuthorController from './Controllers/AuthorController.js';

const router = Router();

router.get('/helth', (request, response) => {
	return response.status(200).json({
		message: 'Server is on'
	});
});
// Books routes

router.get('/books', BookController.index);
router.post('/books', BookController.store);
router.get('/books/:id', BookController.show);
router.put('/books/:id', BookController.update);
router.delete('/books/:id', BookController.destroy);

// Authors routes
router.get('/authors', AuthorController.index);
router.post('/authors', AuthorController.store);
router.get('/authors/:id', AuthorController.show);
router.put('/authors/:id', AuthorController.update);
router.delete('/authors/:id', AuthorController.destroy);

export default router;