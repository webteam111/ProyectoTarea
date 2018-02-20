'use strict'

var mongoose = require ('mongoose')
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose--title-case');

var userSchema = new Schema({
    Nombre: {type: String},
    Apellido: {type: String},
    Edad: {type: Number},
    Sexo: {type: String},
    Usuario: {type: String},
    Email: {type: String},
    Contraseña: {type: String} 

});

userSchema.pre('save', function(next){
    if(!this.isModified('password')) {
        return next();
    }
    else {
        this.password = hash;
        next();
    }
});

userSchema.methods.comparePass = function(password){
    return bcrypt.compareSync(password, this.password);
}

  userSchema.plugin(titlize, {
      paths: [ ' name']
  });

  module.exports = mongoose.model('User', userSchema)