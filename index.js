"use strict";

const express = require("express");
const bodyParser = require("body-parser");

var http = require('https');

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());


restService.post("/echo", function(req, res) {
  //var jsonObj = require("./db.json");
	
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

                // Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1h3ROhL1Tw_ChoIUzWWUWUoOqmElPKYKowdEFFeZfDAw');
	
 var request = http.get("https://jsonblob.com/api/jsonBlob/9232c6f6-37f0-11e8-a0f9-1f16febeb1ac",function(response){
	 var body = "";
	 response.on("data",function(chunk){
		body +=chunk; 
		
	 });
	 
	 response.on("end",function(){
		 var jsonObj = JSON.parse(body);
		 var string1 = "";
		  for (var property1 in jsonObj.employess) {
			  string1 = string1 + jsonObj.employess[property1].name + " : " + jsonObj.employess[property1].shift + " ";
		  }
		  var speech =
		    req.body.result &&
		    req.body.result.parameters &&
		    req.body.result.parameters.echoText
		      ? req.body.result.parameters.echoText
		      : "Seems like some problem. Speak again.";
		  return res.json({
		    speech: creds.type,
		    displayText: speech,
		    source: "webhook-echo-sample"
		  });
		});
		 
	 });
 })	
	
  

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
