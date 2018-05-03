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
		     var string2 = "test";
			 callApi1data().then((output) => {
				
                return res.json({
                    speech: string2,
                    source: 'webhook-echo-one',
				});
			});
		break;
    }
});

	
function callApi1data () {
  return new Promise((resolve, reject) => {
		var GoogleSpreadsheet = require('google-spreadsheet');
		var creds = require('./client_secret.json');
		// Create a document object using the ID of the spreadsheet - obtained from its URL.
		var doc = new GoogleSpreadsheet('19z_cDmfUprmx-xKEynMeMvu0SQNua_dEUMB2SHwDn6w');
 
		// Authenticate with the Google Spreadsheets API.
		doc.useServiceAccountAuth(creds, function (err) {
 
			// Get all of the rows from the spreadsheet.
			  doc.getRows(1, function (err1, rows1) {
				   //console.log(row1);
				  if (err1) {
					console.log(err1);
					reject(err1);
				  }else {
					  var data1 = rows1;
					  
					  var data = [];
					  for (let row1 in data1) {
							var inventory = {};
							inventory.slno = data1[row1]['slno'];
							inventory.productname = data1[row1]['productname'];
							inventory.quantity = data1[row1]['quantity'];
							data.push(inventory);
							
						
					  }
					  resolve(data);
					  //console.log(data);
				  }
				
			  });
		});
  })
}
 
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
