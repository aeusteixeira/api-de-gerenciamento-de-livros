import express from "express";
import AuthorController from "../Controllers/AuthorController.js"

const router = express.Router();

router.get('/authors', AuthorController.index);
router.post('/authors', AuthorController.store);
router.get('/authors/:id', AuthorController.show);
router.put('/authors/:id', AuthorController.update);
router.delete('/authors/:id', AuthorController.destroy);

export default router;