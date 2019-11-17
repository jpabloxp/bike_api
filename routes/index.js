var express = require('express');
var router = express.Router();

const bikeModel = require("../model/bike");
const {
    check,
    validationResult
} = require('express-validator');

let bike = {
  id:'',
  name: '',
  brand: '',
  year: '',
  motorType: '',
  type: ''
 };
 let respuesta = {
  error: false,
  codigo: 200,
  mensaje: ''
 };

 function bikeCheck(bikeId){

  let exists = false;
  var bikes = bikeModel.getBikes();

  for (let bike of bikes) {
    if(bike.id == bikeId){
      exists = true;
      break;
    }
  }
  return exists;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ou yea' });
});

/* GET one page. */
router.get('/readOne/:id', async (req, res, next) => {

  let exists = false;
  var bikeOne = {};

  var bikes = bikeModel.getBikes();
  for (let bike of bikes) {
    if(bike.id == req.params.id){
      exists = true;
      bikeOne = bike;
      break;
    }
  }
  if(exists == false) {

    respuesta = {
      error: true,
      codigo: 503,
      mensaje: 'Bike not registered'
    };
  }
  else {

    respuesta = {
      mensaje: 'Bike found',
      respuesta: bikeOne
    };
  }
   
  res.send(respuesta);

});

/* GET all page. */
router.get('/readAll', async (req, res, next) => {

  try {

      //res.render('index', { title: bikes });
      var bikes = bikeModel.getBikes();
      res.send(bikes);
      
  } catch (error) {
      console.log(error);
      res.status(400).send(error);
  }
});

/* POST one page. */
router.post('/create', async (req, res, next) => {

    if(!req.body.id || !req.body.name || !req.body.brand
      || !req.body.year || !req.body.type) {

      respuesta = {
        error: true,
        codigo: 502,
        mensaje: 'All fields are required'
      };
    }
    else {

      let exists = bikeCheck(req.params.id);

      if(exists == true) {

        respuesta = {
          error: true,
          codigo: 503,
          mensaje: 'Bike already registered'
        };
      }
      else {

        bike = {
          id: req.body.id,
          name: req.body.name,
          brand: req.body.brand,
          year: req.body.year,
          motorType: req.body.motorType,
          type: req.body.type
        };

        const msg = bikeModel.addBike(bike);

        respuesta = {
          mensaje: msg,
          respuesta: bike
        };
      }
    }
     
     res.send(respuesta);
});

/* POST one page. */
router.put('/updateOne', async (req, res, next) => {

  let exists = bikeCheck(req.body.id);

  if(exists == false) {

    respuesta = {
      error: true,
      codigo: 503,
      mensaje: 'Bike not registered'
    };
  }
  else {

    bike = {
      id: req.body.id,
      name: req.body.name,
      brand: req.body.brand,
      year: req.body.year,
      motorType: req.body.motorType,
      type: req.body.type
    };

    const msg = bikeModel.updateBike(bike);

    respuesta = {
      mensaje: msg,
      respuesta: bike
    };
  }
   
  res.send(respuesta);
});

/* DELETE one page. */
router.delete('/deleteOne/:id', async (req, res, next) => {

  let exists = bikeCheck(req.params.id);

  if(exists == false) {

    respuesta = {
      error: true,
      codigo: 503,
      mensaje: 'Bike not registered'
    };
  }
  else {

    const msg = bikeModel.deleteBike(req.params.id);

    respuesta = {
      mensaje: msg,
      respuesta: req.params.id
    };
  }
   
  res.send(respuesta);
});

module.exports = router;
