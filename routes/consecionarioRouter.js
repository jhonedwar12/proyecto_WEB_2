import express from 'express';
import { getConsecionarios, postConsecionario, deleteConsecionario, updateConsecionario } from '../controllers/consecionarioControllers.js';

const router = express.Router();

router.get('/', getConsecionarios);
router.post('/', postConsecionario);
router.delete('/:id', deleteConsecionario);
router.patch('/', updateConsecionario);


export default router;
