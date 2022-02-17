const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = Schema({

    nombre: String,
    apellido: String,
    email: String,
    password: String,
    rol: String,

})

module.exports = mongoose.model('Usuarios',usuarioSchema);