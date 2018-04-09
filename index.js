"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const restService = express();
var dateFormat = require('dateformat');
var http = require('https');

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

 
 restService.post('/echo', function(req, res) {
    console.log('=============' + req.body.result.action)
    switch (req.body.result.action) {
        case "callApi1":

                return res.json({
                    speech: "You may like",
                    source: 'webhook-echo-one',
         
                });
            
            break;

        case "callleave":
            
                return res.json({
                    speech: "Payment successful",
                    source: 'webhook-echo-one'
                });
            
            break;

          

    }



});

	
function callAvailable () {
  return new Promise((resolve, reject) => {
	resolve("Available")
  })
}

function callleave () {
  return new Promise((resolve, reject) => {
	resolve("leave")
  })
}
  
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
