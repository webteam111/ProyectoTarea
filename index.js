'use strict';

const express = require('express');
const mongoose = require('mongoose');
const config = require('./Configuracion/basededatos');
const router = express.Router();
const api = require('./routes/api')(router);
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

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
app.use('/api', api)
app.listen(8080, () => {
    console.log('el programa se conecta con exito');

});