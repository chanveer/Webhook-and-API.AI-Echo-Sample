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


    var GoogleSpreadsheet = require('google-spreadsheet');
	var creds = require('./client_secret.json');
	// Create a document object using the ID of the spreadsheet - obtained from its URL.
	var doc = new GoogleSpreadsheet('1-CxYAf1pR2ZYf9J2-cDVEW3AawnUx-82JuVYVCtqVbY');
	var result = "";
	var sheet;
	var dateFormat = require('dateformat');
	//var date = dateFormat(new Date(), "yyyy-mm-dd"); 
	var date = dateFormat(new Date(), "mmmm d, yyyy");	
	
    switch (req.body.result.action) {
		case "Adddata":
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					doc.getInfo(function(err, info) {
						var cnt = 0;
						for(var property1 in info.worksheets) {
							cnt++;
						}
						var productname = req.body.result.parameters.any;
						var quantity = req.body.result.parameters.number+" "+req.body.result.parameters['unit-weight-name'];
						if(info.worksheets[cnt-1].title == date){
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
									var result = "It's added. You can add some more items.";
								}else{
									var result = "This product has been already added in the list.Do you want to update the quantity?";
								}
								return res.json({
									speech: result,
									source: 'webhook-echo-one',
								});
						});
						}else{
							doc.addWorksheet({
							  title: date
							}, function(err, sheet) {
										sheet.setHeaderRow(['productname', 'quantity']); //async
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
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					doc.getInfo(function(err, info) {
						 var cnt = 0;
						for(var property1 in info.worksheets) {
						   cnt++;
						}
						if(info.worksheets[cnt-1].title == date){
							var productname = req.body.result.parameters.getproduct;
							var newvalue = req.body.result.parameters.getvalue;
							var unit = req.body.result.parameters.unit;
							doc.getRows(cnt, function (err, rows){
								for(var property1 in rows) {
									if(rows[property1].productname == productname){
										var updatevalue = parseInt(rows[property1].quantity) + parseInt(newvalue)+" "+unit;
										rows[property1].quantity = updatevalue;
										rows[property1].save(); // this is async
										break;
									}
								}
								var result = "It's updated. You can add some more items.";	
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
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					doc.getInfo(function(err, info) {
						var cnt = 0;
						for(var property1 in info.worksheets) {
							cnt++;
						}
						var productname = req.body.result.contexts[0].parameters.product;
						var quantity = req.body.result.contexts[0].parameters.number+" "+req.body.result.contexts[0].parameters['unit-weight-name'];
							
						if(info.worksheets[cnt-1].title == date){
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
									var result = "It's added. You can add some more items.";
								}else{
									var result = "This product has been already added in the list.Do you want to update the quantity?";
								}
								return res.json({
									speech: result,
									source: 'webhook-echo-one',
								});
						    });
						}else{
							doc.addWorksheet({
							  title: date
							}, function(err, sheet) {
										sheet.setHeaderRow(['productname', 'quantity']); //async
							});
							var result = "We have added the spread sheet please add the utterance again";
						    return res.json({
								speech: result,
								source: 'webhook-echo-one',
							});
						}
					});
				});
		break;
		case "addproduct":
				// Authenticate with the Google Spreadsheets API.
				doc.useServiceAccountAuth(creds, function (err) {
					doc.getInfo(function(err, info) {
						var cnt = 0;
						for(var property1 in info.worksheets) {
						  cnt++;
						}
						var productname = req.body.result.contexts[0].parameters.any;
						var quantity = req.body.result.contexts[0].parameters.quantaty;
						
						if(info.worksheets[cnt-1].title == date){
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
									var result = "It's added. You can add some more items.";
								}else{
									var result = "This product has been already added in the list.Do you want to update the quantity?";
								}
								return res.json({
									speech: result,
									source: 'webhook-echo-one',
								});
						    });
						}
						
						
						else{
						      doc.addWorksheet({
							  title: date
							  }, function(err, sheet) {
										sheet.setHeaderRow(['productname', 'quantity']); //async
							  });
							var result = "We have added the spread sheet please add the utterance again";
							return res.json({
								speech: result,
								source: 'webhook-echo-one',
							});
						}
						
				   });
				});
		break;
    }
});
 
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
