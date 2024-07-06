import express from 'express';
import { deleteCine, updateCine, get, post } from '../controllers/cineControllers.js';

const router = express.Router();

router.get('/', get);
router.post('/', post);
router.delete('/:id', deleteCine);
router.patch('/', updateCine);


export default router;
