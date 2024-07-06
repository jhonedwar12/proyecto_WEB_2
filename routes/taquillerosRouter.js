import express from 'express';
import { deleteTaquillero, updateTaquillero, get, post } from '../controllers/taquilleroControllers.js';

const router = express.Router();

router.get('/', get);
router.post('/', post);
router.delete('/:id', deleteTaquillero);
router.patch('/', updateTaquillero);


export default router;
