'use strict'

const bcrypt = require('bcrypt');
const validator = require('validator');

//Models
const User = require('../models/user');

const request = require("request");

  
// buscar
function buscarApp(req, res) {
  var params = req.body;
  console.log(params);

  request("https://api.mercadolibre.com/sites/MLM/search?q="+params.busqueda+"&sort=price_asc", function(err, response, body){
  
    body = JSON.parse(body);
    
    var temporal= [];
    var newjson={};

    /*
    body.results.forEach (obj => {
      Object.entries (obj) .forEach (([key, value]) => {
        console.log(key,value);
        //if(key == "id"){
          //temporal.push('{"sellerID":"'+value+'"');
        //}        
      });
      console.log ('-------------------');
    });*/
    ///newjson=JSON.parse(temporal);
    for (var i = 0; i < body.results.length; i++){

      console.log(body.results[i].shipping.free_shipping);
      temporal.push("{id:"+i+",sellerID:"+body.results[i].seller.id+",enviogratis:"+body.results[i].shipping.free_shipping+",tipologistica:"+body.results[i].shipping.logistic_type+",condicionart:"+body.results[i].condition+"}");

    }
      
      console.log(JSON.parse(temporal));
              

    

    //console.log(newjson);

    if(body.success != true){
          return res.status(201).send({
            suscess: false,
            error: true,
            message: 'Failed recaptcha'
          })
        }
  });
  
  

}


module.exports = {
  buscarApp
}
