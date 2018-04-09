"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
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
  
    // Authenticate with the Google Spreadsheets API.
                doc.useServiceAccountAuth(creds, function (err) {
                                console.log('here');
                  // Get all of the rows from the spreadsheet.
                  doc.getRows(1, function (err1, rows1) {
                                if (err1) {
                                                console.log(err1);
                                                reject(err1);
                                }
                                else {
                                                var data1 = rows1;
                                                  doc.getRows(2, function (err2, rows2) {
                                                                if (err2) {
                                                                                console.log(err2);
                                                                                reject(err2);
                                                                }
                                                                else {
                                                                                var data = [];
                                                                                var data2 = rows2;
                                                                                for (let row1 in data1) {
                                                                                                var emp = {};
                                                                                                emp.empid = data1[row1]['empid'];
                                                                                                emp.firstname = data1[row1]['firstname'];
                                                                                                emp.lastname = data1[row1]['lastname'];
                                                                                                emp.email = data1[row1]['email'];
                                                                                                emp.phone = data1[row1]['phone'];
                                                                                                if (!('schedule' in emp))
                                                                                                                emp.schedule = [];
                                                                                                for (let row2 in data2) {
                                                                                                                var sch = {};
                                                                                                                if (data2[row2]['employeeid'] == data1[row1]['empid']) {
                                                                                                                                sch.date = data2[row2]['date'];
                                                                                                                                sch.employeeid = data2[row2]['employeeid'];
                                                                                                                                sch.starttime = data2[row2]['starttime'];
                                                                                                                                sch.endtime = data2[row2]['endtime'];
                                                                                                                                sch.location = data2[row2]['location'];
                                                                                                                                emp.schedule.push(sch);
                                                                                                                }
                                                                                                }
                                                                                                data.push(emp);
                                                                                }
                                                                                console.log(data);
                                                                                resolve(data);
									
									 response.on("end",function(){
									 var jsonObj = JSON.parse(data);
									 var string1 = "";
									  for (var property1 in jsonObj.employess) {
										  string1 = string1 + jsonObj.employess[property1].firstname + " : " + jsonObj.employess[property1].lastname + " ";
									  }
									  var speech =
									    req.body.result &&
									    req.body.result.parameters &&
									    req.body.result.parameters.echoText
									      ? req.body.result.parameters.echoText
									      : "Seems like some problem. Speak again.";
									  return res.json({
									    speech: string1,
									    displayText: speech,
									    source: "webhook-echo-sample"
									  });
									});
                                                  }
                                                });
                                }
                  });
                });
  
 
	 
	
		 
	 });
 })	
	
  

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
