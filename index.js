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


restService.post("/echo", function(req, res) {
	callApi1().then((output) => {
		return res.json({
			speech: output,
			displayText: speech,
			source: "webhook-echo-sample"
		});
    }).catch((error) => {
                                
    });
	
	callleave().then((output) => {
		return res.json({
			speech: output,
			displayText: "asasas",
			source: "webhook-echo-sample"
		});
	 }).catch((error) => {
                                
    });
 })	
	
function callApi1() {
  return new Promise((resolve, reject) => {
	resolve("im on available");
  })
}

function callleave() {
  return new Promise((resolve, reject) => {
	resolve("im on leave");
  });
}
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
