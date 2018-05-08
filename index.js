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
				var GoogleSpreadsheet = require('google-spreadsheet');
			    var creds = require('./client_secret.json');
				// Create a document object using the ID of the spreadsheet - obtained from its URL.
				var doc = new GoogleSpreadsheet('19z_cDmfUprmx-xKEynMeMvu0SQNua_dEUMB2SHwDn6w');
				var result = "";
				
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					
					doc.getInfo(function(err, info) {
						
						var cnt = 0;
						for(var property1 in info.worksheets) {
							console.log(info.worksheets[property1].title);
							cnt++;
						  
						}
					
						if(info.worksheets[cnt-1].title == 'Inventory-'+date){
							
							var productname = req.body.result.parameters.any;
							var quantity = req.body.result.parameters.number+" "+req.body.result.parameters['unit-weight-name'];
							doc.addRow(cnt, { PRODUCTNAME: productname,QUANTITY: quantity}, function(err) {
							  if(err) {
								console.log(err);
							  }
							});
							
						}else{
							
							
						}
					
					
				   });
				   
				   
				});
				var result = "Request has been captured in the sheet successfully.";		
                return res.json({
                    speech: result,
                    source: 'webhook-echo-one',
				});
			
		break;
		
		case "addquantity":
		
				var GoogleSpreadsheet = require('google-spreadsheet');
			    var creds = require('./client_secret.json');
				// Create a document object using the ID of the spreadsheet - obtained from its URL.
				var doc = new GoogleSpreadsheet('19z_cDmfUprmx-xKEynMeMvu0SQNua_dEUMB2SHwDn6w');
				var result = "";
				
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					
					//var quantity = req.body.result.parameters.number+" "+req.body.result.parameters['unit-weight-name'];
		 			var productname = req.body.result.contexts[0].parameters.product;
					var quantity = req.body.result.contexts[0].parameters.number+" "+req.body.result.contexts[0].parameters['unit-weight-name'];
					
		 
					doc.addRow(1, { PRODUCTNAME: productname,QUANTITY: quantity}, function(err) {
					  if(err) {
						console.log(err);
					  }
					
				   });
				});
				var result = "Request has been captured in the sheet successfully.";		
                return res.json({
                    speech: result,
                    source: 'webhook-echo-one',
				});
		break;
		
		case "addproduct":
		
				var GoogleSpreadsheet = require('google-spreadsheet');
			    var creds = require('./client_secret.json');
				// Create a document object using the ID of the spreadsheet - obtained from its URL.
				var doc = new GoogleSpreadsheet('19z_cDmfUprmx-xKEynMeMvu0SQNua_dEUMB2SHwDn6w');
				var result = "";
				
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					
					//var quantity = req.body.result.parameters.number+" "+req.body.result.parameters['unit-weight-name'];
		 			var productname = req.body.result.contexts[0].parameters.any;
					var quantity = req.body.result.contexts[0].parameters.number+" "+req.body.result.contexts[0].parameters['unit-weight-name'];
					
		 
					doc.addRow(1, { PRODUCTNAME: productname,QUANTITY: quantity}, function(err) {
					  if(err) {
						console.log(err);
					  }
					
				   });
				});
				var result = "Request has been captured in the sheet successfully.";		
                return res.json({
                    speech: result,
                    source: 'webhook-echo-one',
				});
		break;
    }
});
 
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
