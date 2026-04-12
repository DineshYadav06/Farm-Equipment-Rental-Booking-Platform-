import express from 'express';
import { getEquipment, getNearbyEquipment, createEquipment, updateEquipment } from '../controllers/equipmentController.js';
import { protect, ownerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getEquipment).post(protect, ownerOnly, createEquipment);
router.route('/nearby').get(getNearbyEquipment);
router.route('/:id').put(protect, ownerOnly, updateEquipment);

export default router;
