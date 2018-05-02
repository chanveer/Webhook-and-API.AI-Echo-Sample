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
		 case "Adddata":
			callApi1data().then((output) => {
                return res.json({
                    speech: output,
                    source: 'webhook-echo-one',
				});
			});
		break;
    }
});

	
function callApi1data () {
  return new Promise((resolve, reject) => {
	var GoogleSpreadsheet = require('google-spreadsheet');
	var async = require('async');
	var creds = require('./client_secret.json');
	// Create a document object using the ID of the spreadsheet - obtained from its URL.
	var doc = new GoogleSpreadsheet('1TMG7tWxF0HhpyIHLHOtbGtnHiFO6ICNzvDeAs3LqDWE');
	var sheet;
	var data = "data has been added pls check the sheet";
	async.series([
		
		  
		], function(err){
			if( err ) {
			  console.log('Error: '+err);
			}
		});
	resolve(data);
  })
}
 
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
