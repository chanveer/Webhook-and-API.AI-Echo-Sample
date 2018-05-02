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
    console.log('=============' + req.body.queryResult.action)
    switch (req.body.queryResult.action) {
		 case "Adddata":
			//callApi1data().then((output) => {
				var string2 = "data has been added pls check the sheet";
                return res.json({
                    speech: string2,
                    source: 'webhook-echo-one',
				});
			//});
		break;
    }
});

	
 
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
