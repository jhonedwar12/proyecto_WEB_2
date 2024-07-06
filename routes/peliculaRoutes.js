import express from 'express';
import { deletePelicula, updatePelicula, get, post } from '../controllers/peliculaControllers.js';

const router = express.Router();

router.get('/', get);
router.post('/', post);
router.delete('/:id', deletePelicula);
router.patch('/', updatePelicula);


export default router;
