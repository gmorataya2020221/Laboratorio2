const jwt = require('jwt-simple');
const moment = require('moment');
const claveSecreta = "clave_secreta";

exports.Auth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(500).send({ mensaje: 'La peticion no tiene la cabecera authorization'});
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, claveSecreta);
        // EXP = variable que contiene el tiempo de expiracion
        if( payload.exp <= moment().unix()){
            return res.status(500).send({ mensaje: 'El token ha expirado.'})
        }
    } catch (error) {
        return res.status(500).send({ mensaje: 'El token no es valido.'})
    }

    req.user = payload;
    next();
}