const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarioController')
const middleware = require('../middlewares/authMiddleware');

// Obtener todos los usuarios
router.get('/', middleware.routeProtected, userController.getAllUsers);

//obtener usuario por id
router.get('/:id',middleware.routeProtected, userController.getProfile);

module.exports = router;

