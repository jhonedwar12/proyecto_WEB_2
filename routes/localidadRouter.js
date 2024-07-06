import express from 'express';
import { deleteLocalidad, updateLocalidad, get, post } from '../controllers/localidadControllers.js';

const router = express.Router();

router.get('/', get);
router.post('/', post);
router.delete('/:id', deleteLocalidad);
router.patch('/', updateLocalidad);


export default router;
