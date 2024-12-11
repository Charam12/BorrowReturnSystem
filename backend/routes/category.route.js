const express = require('express');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authenticateToken, getCategories);
router.post('/', authenticateToken, authorizeAdmin, createCategory);
router.get('/:id', authenticateToken, getCategory);
router.put('/:id', authenticateToken, authorizeAdmin, updateCategory);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteCategory);

module.exports = router;
