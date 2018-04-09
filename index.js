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
	
 		callApi1().then((output) => {
			return res.json({
		    speech: "uwuiwe",
		    displayText: "weeewwe",
		    source: "webhook-echo-sample"
		  });
                  }).catch((error) => {
                                // If there is an error let the user know
                                //res.setHeader('Content-Type', 'application/json');
                                //res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
                  });
 })	
	

function callApi1 () {
  return new Promise((resolve, reject) => {

                var GoogleSpreadsheet = require('google-spreadsheet');
                var creds = require('./client_secret.json');

                // Create a document object using the ID of the spreadsheet - obtained from its URL.
                var doc = new GoogleSpreadsheet('1h3ROhL1Tw_ChoIUzWWUWUoOqmElPKYKowdEFFeZfDAw');

                // Authenticate with the Google Spreadsheets API.
                doc.useServiceAccountAuth(creds, function (err) {
                                
                  // Get all of the rows from the spreadsheet.
			if(err){
			 reject(err);	
			}else{
			resolve("test");
			}
                });
  })
}
  

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
