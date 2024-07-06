import express from 'express';
import { getSalas, postSala, deleteSala, updateSala  } from '../controllers/salaControllers.js';

const router = express.Router();

router.get('/', getSalas);
router.post('/', postSala);
router.delete('/:id', deleteSala);
router.patch('/', updateSala);


export default router;
