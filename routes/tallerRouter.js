import express from 'express';
import { deleteTaller, updateTaller, getTaller, postTaller } from '../controllers/tallerControllers.js';

const router = express.Router();

router.get('/', getTaller);
router.post('/', postTaller);
router.delete('/:id', deleteTaller);
router.patch('/', updateTaller);


export default router;
