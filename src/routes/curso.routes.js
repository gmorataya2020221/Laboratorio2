const express = require('express');
const controladorCurso = require('../controllers/curso.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.post('/agregarCurso',md_autenticacion.Auth,controladorCurso.AgregarCursos);
api.post('/agregarCurso',controladorCurso.ObtenerCursos);
api.delete('/agregarCurso',md_autenticacion.Auth,controladorCurso.EliminarCurso);
api.put('/agregarCurso',md_autenticacion.Auth,controladorCurso.EditarCurso);
    
module.exports = api;