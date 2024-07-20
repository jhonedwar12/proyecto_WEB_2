import express from 'express';
import { getVentas, postVentas, deleteVentas, updateVentas} from '../controllers/ventaControllers.js';

const router = express.Router();

router.get('/', getVentas);
router.post('/', postVentas);
router.delete('/:id', deleteVentas);
router.patch('/', updateVentas);


export default router;
