const express = require('express');
const { getUsers, createUser, loginUser, authen, updateProfile } = require('../controllers/user.controller');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', authenticateToken, authorizeAdmin, getUsers);
router.get('/', authenticateToken, authorizeAdmin, createUser);
router.post('/login', loginUser);
router.get('/authen', authenticateToken, authen);
router.put('/profile', authenticateToken, updateProfile);
router.put('/:id', authenticateToken, authorizeAdmin, loginUser);
router.delete('/:id', authenticateToken, authorizeAdmin, loginUser);

module.exports = router;