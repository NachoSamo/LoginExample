const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarioController')

// Obtener todos los usuarios
router.get('/', userController.getAllUsers);

//obtener usuario por id
router.get('/:id', userController.getProfile);

module.exports = router;

