"use strict";

const express = require("express");
const bodyParser = require("body-parser");

var dateFormat = require('dateformat');

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
			
				var string1 = "";
				var string2 = "";
				var string3 = "";
																				
				for(var property1 in data) {
																					
					//string1  = string1 + data[property1].firstname;
								
					for(var property2 in data[property1].schedule) {
						 string2 =   string2 + data[property1].firstname + "  "  +  data[property1].schedule[property2].starttime  + " : " + data[property1].schedule[property2].endtime + '\r\n';
					}	

				}
			
			  var speech =
			    req.body.result &&
			    req.body.result.parameters &&
			    req.body.result.parameters.echoText
			      ? req.body.result.parameters.echoText
			      : "Seems like some problem. Speak again.";
			  return res.json({
			    speech: output,
			    displayText: speech,
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
		 
                                                                                //console.log(data[1].empid);
                                                                                resolve(data);
                                                  }
                                                });
                                }
                  });
				
			}
                });
  })
}
  

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
