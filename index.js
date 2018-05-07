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
				
				
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					
					var sheet;
					var dateFormat = require('dateformat');
					var date = dateFormat(new Date(), "yyyy-mm-dd"); 
					
					doc.getInfo(function(err, info) {
						var cnt = 0;
						for(var property1 in info.worksheets) {
						  
						    console.log(info.worksheets[property1].title);
							cnt++;
						  
						}
						if(info.worksheets[cnt-1].title == 'INVENOTY-'+date){
							var quantity = req.body.result.parameters.number+" "+req.body.result.parameters['unit-weight-name'];
							doc.addRow(1, { PRODUCTNAME: req.body.result.parameters.any,QUANTITY: quantity}, function(err) {
							  if(err) {
								console.log(err);
							  }
						   });
						}else{
						  console.log("sheet is not there");
						}
					});
				});
				
                return res.json({
                    speech: "Data has been added",
                    source: 'webhook-echo-one',
				});
			
		break;
    }
});
 
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
