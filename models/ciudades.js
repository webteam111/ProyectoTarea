'use strict'

var mongoose = require ('mongoose')
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ciudad = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');

var ciudadSchema = new Schema({
    nombre: {type: String},
    fecha: {type: Date},
    like: {type: String},
    compañero: {type: String},
     
    client:[{
    nombre: {type: String},
    fecha: {type: Date},
    like: {type: String},
    compañero: {type: String},
    }]
});
module.exports = mongoose.model('ciudad',ciudadSchema);