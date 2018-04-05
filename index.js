"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());


restService.post("/user", function(req, res) {
  var jsonObj = require("./db.json");
  var string1 = "";

	for (var property1 in jsonObj.employess) {
	  string1 = string1 + jsonObj.employess[property1].name + " : " + jsonObj.employess[property1].shift + " ";
	}
  var speech =
    req.body.result && req.body.result.parameters && req.body.result.parameters.date ? req.body.result.parameters.date: "Seems like some problem. Speak again.";
    
   
  return res.json({
     speech: string1,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
