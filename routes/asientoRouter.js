import express from 'express';
import { getAsientos, postAsiento, deleteAsiento, updateAsiento } from '../controllers/asientoControllers.js';

const router = express.Router();

router.get('/', getAsientos);
router.post('/', postAsiento);
router.delete('/:id', deleteAsiento);
router.patch('/', updateAsiento);


export default router;
