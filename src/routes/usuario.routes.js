const express = require('express');
const controladorUsuario = require('../controllers/usuario.controller');
const md_autentication = require('../middlewares/autenticacion');


const api = express.Router();

api.post('/registrarMaestro',controladorUsuario.RegistrarMaestro);
api.post('/registrarMaestroPorDefault',controladorUsuario.RegistrarMaestroPorDefault);
api.post('/registrarAlumno',controladorUsuario.RegistrarAlumno);
api.put('/editarUsuario/:idUsuario',md_autentication.Auth,controladorUsuario.EditarUsuario);
api.delete('/eliminarUsuario/:idUsuario',md_autentication.Auth,controladorUsuario.EliminarUsuario);
api.post('/login',controladorUsuario.Login);

module.exports =api;
