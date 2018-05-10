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

restService.post('/insert', function(req, res) {
    console.log('=============' + req.body.result.action)
    switch (req.body.result.action) {
		case "Adddata":
				var GoogleSpreadsheet = require('google-spreadsheet');
			    var creds = require('./client_secret.json');
				// Create a document object using the ID of the spreadsheet - obtained from its URL.
				var doc = new GoogleSpreadsheet('19z_cDmfUprmx-xKEynMeMvu0SQNua_dEUMB2SHwDn6w');
				var result = "";
				var sheet;
				var dateFormat = require('dateformat');
				var date = dateFormat(new Date(), "yyyy-mm-dd"); 
				
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					doc.getInfo(function(err, info) {
						 var cnt = 0;
						 for(var property1 in info.worksheets) {
							cnt++;
						 }
						 
						 
						 var productname = req.body.result.parameters.any;
						 var quantity = req.body.result.parameters.number+" "+req.body.result.parameters['unit-weight-name'];
						 if(info.worksheets[cnt-1].title == 'Inventory-'+date){
						 
						 
						 
						 
							/*
							var productname = req.body.result.parameters.any;
							var quantity = req.body.result.parameters.number+" "+req.body.result.parameters['unit-weight-name'];
							
				 			doc.addRow(cnt, { PRODUCTNAME: productname,QUANTITY: quantity}, function(err) {
								  if(err) {
									console.log(err);
								  }
							});
						   var result = "Yeah it's added. You can add somemore items.";
						   */
						   
						   
						   	
							var flag = "";
							
							
								doc.getRows(cnt, function (err, rows) {
								for(var property1 in rows) {
									if(rows[property1].productname == productname){
										flag = 1;
										break;
									}else{
										flag = 0;
									}
								}
								if(flag == 0){
									doc.addRow(cnt, { PRODUCTNAME: productname,QUANTITY: quantity}, function(err) {
										  if(err) {
											console.log(err);
										  }
									});
									var result = "Yeah it's added. You can add somemore items.";
								}else{
									var result = "Do you want to add more quantity to the same product";
								}
								
								return res.json({
									speech: result,
									source: 'webhook-echo-one',
								});
								
						   });
						   
						   
						   
						   
						   
						   
						   
						 }else{
						 
						 
							  doc.addWorksheet({
							  title: 'Inventory-'+date
							  }, function(err, sheet) {
										sheet.setHeaderRow(['productname', 'quantity']); //async
							  });
							  
							  doc.addRow(cnt, { PRODUCTNAME: productname,QUANTITY: quantity}, function(err) {
								  if(err) {
									console.log(err);
								  }
							
							  });
							var result = "We have added the spread sheet and given phrase";
						   
						   
						   return res.json({
								speech: result,
								source: 'webhook-echo-one',
							});
						 } 

						
				   });
				});
						
                
			
		break;
		
		case "updateproductQuanity":
		
				var GoogleSpreadsheet = require('google-spreadsheet');
			    var creds = require('./client_secret.json');
				// Create a document object using the ID of the spreadsheet - obtained from its URL.
				var doc = new GoogleSpreadsheet('19z_cDmfUprmx-xKEynMeMvu0SQNua_dEUMB2SHwDn6w');
				var result = "";
				var sheet;
				var dateFormat = require('dateformat');
				var date = dateFormat(new Date(), "yyyy-mm-dd"); 
				
				
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					doc.getInfo(function(err, info) {
						 var cnt = 0;
						 for(var property1 in info.worksheets) {
							cnt++;
						 }
						 if(info.worksheets[cnt-1].title == 'Inventory-'+date){
						 
							var productname = req.body.result.parameters.getproduct;
							var newvalue = req.body.result.parameters.getvalue;
							
								doc.getRows(cnt, function (err, rows) {
								for(var property1 in rows) {
									if(rows[property1].productname == productname){
										var updatevalue = parseInt(rows[property1].quantity) + parseInt(newvalue);
										
										
										rows[property1].quantity = updatevalue;
										rows[property1].save(); // this is async
										break;
									}
								}
								var result = "Yeah it's updated. You can add somemore items.";	
								
								return res.json({
									speech: result,
									source: 'webhook-echo-one',
								});
								
						   });
						   
						 } 

						
				   });
				});
				
		break;
		
		case "addquantity":
		
				var GoogleSpreadsheet = require('google-spreadsheet');
			    var creds = require('./client_secret.json');
				// Create a document object using the ID of the spreadsheet - obtained from its URL.
				var doc = new GoogleSpreadsheet('19z_cDmfUprmx-xKEynMeMvu0SQNua_dEUMB2SHwDn6w');
				var result = "";
				var sheet;
				var dateFormat = require('dateformat');
				var date = dateFormat(new Date(), "yyyy-mm-dd"); 
				
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					doc.getInfo(function(err, info) {
						 var cnt = 0;
						 for(var property1 in info.worksheets) {
							cnt++;
						 }
						 if(info.worksheets[cnt-1].title == 'Inventory-'+date){
							var productname = req.body.result.contexts[0].parameters.product;
							var quantity = req.body.result.contexts[0].parameters.number+" "+req.body.result.contexts[0].parameters['unit-weight-name'];
					
				 
							doc.addRow(cnt, { PRODUCTNAME: productname,QUANTITY: quantity}, function(err) {
							  if(err) {
								console.log(err);
							  }
							
						   });
						    var result = "Yeah it's added. You can add somemore items.";
						 }else{
						   doc.addWorksheet({
							  title: 'Inventory-'+date
						   }, function(err, sheet) {
									sheet.setHeaderRow(['productname', 'quantity']); //async
						   });
						   var result = "We have added the spread sheet please add the utterance again";
						 }
						 return res.json({
							speech: result,
							source: 'webhook-echo-one',
						});
				   });
				});
				
						
                
		break;
		
		case "addproduct":
		
				var GoogleSpreadsheet = require('google-spreadsheet');
			    var creds = require('./client_secret.json');
				// Create a document object using the ID of the spreadsheet - obtained from its URL.
				var doc = new GoogleSpreadsheet('19z_cDmfUprmx-xKEynMeMvu0SQNua_dEUMB2SHwDn6w');
				var result = "";
				var sheet;
				var dateFormat = require('dateformat');
				var date = dateFormat(new Date(), "yyyy-mm-dd");
				
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					doc.getInfo(function(err, info) {
						 var cnt = 0;
						 for(var property1 in info.worksheets) {
							cnt++;
						 }
						 if(info.worksheets[cnt-1].title == 'Inventory-'+date){
							var productname = req.body.result.contexts[0].parameters.any;
							var quantity = req.body.result.contexts[0].parameters.number+" "+req.body.result.contexts[0].parameters['unit-weight-name'];
					
				 
							doc.addRow(cnt, { PRODUCTNAME: productname,QUANTITY: quantity}, function(err) {
							  if(err) {
								console.log(err);
							  }
							
						   });
						    var result = "Yeah it's added. You can add somemore items.";
						 }else{
						      doc.addWorksheet({
							  title: 'Inventory-'+date
							  }, function(err, sheet) {
										sheet.setHeaderRow(['productname', 'quantity']); //async
							  });
							var result = "We have added the spread sheet please add the utterance again";
						 }

						return res.json({
							speech: result,
							source: 'webhook-echo-one',
						});
				   });
				});
						
                
		break;
    }
});
 
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
