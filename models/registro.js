'use strict'

var mongoose = require ('mongoose')
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');

var userSchema = new Schema({
    Nombre: {type: String},
    Apellido: {type: String},
    Edad: {type: Number},
    Sexo: {type: String},
    Usuario: {type: String},
    Email: {type: String},
    Contraseña: {type: String}, 
    client:[{
        Nombre: {type: String},
        Apellido: {type: String},
        Edad: {type: String},
        Sexo: {type: String},
        Usuario: {type: String},
      }]
});

userSchema.pre('save', function(next){
    if (!this.isModified('Contraseña')) {
      return next();
    }
    else{
      bcrypt.hash(this.Contraseña, null, null,(err, hash)=>{
        if (err) return next(err);
        else{
          this.Contraseña = hash;
          next();
        }
      })
    }
  });

userSchema.methods.comparePass = function(Contraseña){
    return bcrypt.compareSync(Contraseña, this.Contraseña);
}

  userSchema.plugin(titlize, {
      paths: [ 'name']
  });

  module.exports = mongoose.model('User', userSchema)