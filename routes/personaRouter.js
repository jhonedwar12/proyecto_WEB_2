import express from 'express';
import { deletePersona, updatePersona, getPersonas} from '../controllers/personaControllers.js';

const router = express.Router();

router.get('/', getPersonas);
router.delete('/:id', deletePersona);
router.patch('/', updatePersona);


export default router;
