'use strict';

var express = require('express');
const mongoose = require('mongoose');
const config = require('./Configuracion/basededatos');
const router = express.Router();
const api = require('./routes/api')(router);
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) =>{
  if (err) {
    console.log(err);
  } else {
    console.log("conectado");
  }
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(8080, function(){
    console.log('muy bien pendejo');

});