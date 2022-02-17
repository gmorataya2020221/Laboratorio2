const Usuario = require('../models/usario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function RegistrarMaestroPorDefault (req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario();

    if(parametros.nombre &&  parametros.email) {
            Usuario.find({ email : "Erik@gmail.com" }, (err, usuarioEncontrados) => {
                if ( usuarioEncontrados.length > 0 ){ 
                    return res.status(500).send({ mensaje: "Este correo ya se encuentra en uso" })
                } else {
                    modeloUsuario.nombre = "Erik";
                    modeloUsuario.apellido = "Bran"
                    modeloUsuario.email = "Erik@gmail.com";
                    modeloUsuario.password ='123456' ;
                    modeloUsuario.rol = 'Maestro';
                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        modeloUsuario.password = passwordEncriptada;
                        modeloUsuario.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500).send({ mensaje : 'Error en la peticion' })
                            if(!usuarioGuardado) return res.status(500).send({ mensaje: 'Error al guardar al Maestro' })
                            return res.status(200).send({ usuario: usuarioGuardado})
                        })
                    })                    
                }
            } )
    }
}

function RegistrarMaestro(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario();

    Usuario.find({ email: parametros.email}, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            return res.status(500).send({mensaje:'Este correro ya se esta utilizando'})
        } else {
           if (parametros.nombre && parametros.apellido && parametros.email &&  
                parametros.password
               ) {
                modeloUsuario.nombre = parametros.nombre; 
                modeloUsuario.apellido = parametros.apellido; 
                modeloUsuario.email = parametros.email;
                modeloUsuario.password = parametros.password;
                modeloUsuario.rol = 'Maestro';
                bcrypt.hash(parametros.password, null, null, (err, passwordEncripatada) => {
                    modeloUsuario.password = passwordEncripatada;

                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({mensaje: 'Error en la peticion'})
                        if (!usuarioGuardado) return res.status(500).send({mensaje: 'Error al Registrar'});
    
                        return res.status(200).send({usuario: usuarioGuardado});
                    });
                })     
           }else {
               return res.status(500).send({mensaje:'Debe ingrear los parametros obligatorios'})
           }
        }
    });   
}

function RegistrarAlumno (req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuario();

    if(parametros.nombre &&  parametros.email) {
            Usuario.find({ email : parametros.email }, (err, usuarioEncontrados) => {
                if ( usuarioEncontrados.length > 0 ){ 
                    return res.status(500).send({ mensaje: "Este correo ya se encuentra utilizado" })
                } else {
                    modeloUsuario.nombre = parametros.nombre;
                    modeloUsuario.apellido = parametros.apellido;
                    modeloUsuario.email = parametros.email;
                    modeloUsuario.password = parametros.password;
                    modeloUsuario.rol = "Usuario";

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        modeloUsuario.password = passwordEncriptada;
                        modeloUsuario.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500).send({ mensaje : 'Error en la peticion' })
                            if(!usuarioGuardado) return res.status(500).send({ mensaje: 'Error al guardar el Usuario' })
    
                            return res.status(200).send({ usuario: usuarioGuardado})
                        })
                    })                    
                }
            })
    } else {
        return res.status(404).send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }
}

function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        return res.status(200).send({ token: jwt.crearToken(usuarioEncontrado) })
                    } else {
                        return res.status(500).send({ mensaje: 'La contrasena no coincide'})
                    }
                })
        } else {
            return res.status(500).send({ mensaje: 'El usuario no se ha podido identificar'})
        }
    })
}

function EliminarUsuario (req,res){
    var idUsu = req.params.idUsuario;
    Usuario.findByIdAndDelete(idUsu, (err, usuarioEliminado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
    if(!usuarioEliminado) return res.status(500).send({mensaje: 'Error al eliminar'});

    return res.status(200).send({ usuario: usuarioEliminado})

    })
}


function EditarUsuario(req,res){
    var idUser = req.params.idUsuario;
    var parametros = req.body;
    delete parametros.password

    if (req.user.sub !== idUser) {
        return res.status(500).send({mensaje:'No tiene los permisos para editar este usuario'});
    }

    Usuario.findByIdAndUpdate(req.user.sub, parametros, {new: true}, (err, usuarioEditado)=>{
        if (err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!usuarioEditado) return res.status(500).send({mensaje:'Error al editar el Usuario'});
        
        return res.status(200).send({usuario: usuarioEditado});
    })
}

module.exports={
    RegistrarAlumno,
    RegistrarMaestro,
    EditarUsuario,
    EliminarUsuario,
    RegistrarMaestroPorDefault,
    Login
}