'use strict'

const mongoose = require ('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const ciudad = mongoose.model('User');
const bcrypt = require('bcrypt-nodejs');
const titlize = require('mongoose-title-case');

const ciudadSchema = new Schema({
    nombre: {
        firstName: String,
        lastName: String
    },
    fecha: {type: Date},
    like: {type: String},
    userId: {type: String},
    compañero:[{
        nombre: {type: String},
    }]
});
module.exports = mongoose.model('ciudad',ciudadSchema);


loopbackc