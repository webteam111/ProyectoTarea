'use strict'

const mongoose = require ('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const titlize = require('mongoose-title-case');

const userSchema = new Schema({
    Nombre: {type: String},
    Apellido: {type: String},
    Edad: {type: Number},
    Sexo: {type: String},
    Usuario: {type: String, unique: true},
    Email: {type: String, unique: true},
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
  //Capitaliza primera letra de cada path
  userSchema.plugin(titlize, {
      paths: [ 'name']
  });

  module.exports = mongoose.model('User', userSchema)