const express = require('express');
const { getEquipment, createEquipment, updateEquipment, deleteEquipment } = require('../controllers/equipment.controller');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authenticateToken, getEquipment);
router.post('/', authenticateToken, authorizeAdmin, createEquipment);
router.put('/:id', authenticateToken, authorizeAdmin, updateEquipment);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteEquipment);

module.exports = router;
