const express = require('express');
const controladorAsignacion = require('../controllers/asignacion.controller');
const md_autentication = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/agregarAsignacion', md_autentication.Auth, controladorAsignacion.AgregarAsignaciones);
api.put('/editarAsignacion/:idAsignacion', md_autentication.Auth, controladorAsignacion.EditarAsignacion);
api.delete('/eliminarAsignacion/:idAsignacion', md_autentication.Auth, controladorAsignacion.EliminarAsignacion);
api.get('/obtenerAsignaciones', controladorAsignacion.ObtenerAsignaciones);



module.exports = api;