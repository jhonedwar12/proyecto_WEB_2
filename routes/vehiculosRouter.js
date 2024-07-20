import express from 'express';
import { deleteVehiculo, updateVehiculo, getVehiculos, postVehiculo } from '../controllers/vehiculosControllers.js';

const router = express.Router();

router.get('/', getVehiculos);
router.post('/', postVehiculo);
router.delete('/:id', deleteVehiculo);
router.patch('/', updateVehiculo);


export default router;
