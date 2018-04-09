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

			callApi1data().then((output) => {
                return res.json({
                    speech: output,
                    source: 'webhook-echo-one',
         
                });
            });
			
            break;

        case "callleave":
            callleavedata().then((output) => {
                return res.json({
                    speech: output,
                    source: 'webhook-echo-one'
                });
            });
            break;

          

    }



});

	
function callApi1data () {
  return new Promise((resolve, reject) => {
	resolve("Available")
  })
}

function callleavedata () {
  return new Promise((resolve, reject) => {
	resolve("leave")
  })
}
  
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
