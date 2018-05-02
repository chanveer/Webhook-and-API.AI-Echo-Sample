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
			callApi1data().then((output) => {
                return res.json({
                    speech: output,
                    source: 'webhook-echo-one',
				});
			});
		break;
    }
});

	
function callApi1data () {
  return new Promise((resolve, reject) => {
	var GoogleSpreadsheet = require('google-spreadsheet');
	var async = require('async');
	var creds = require('./client_secret.json');
	// Create a document object using the ID of the spreadsheet - obtained from its URL.
	var doc = new GoogleSpreadsheet('1TMG7tWxF0HhpyIHLHOtbGtnHiFO6ICNzvDeAs3LqDWE');
	var sheet;
	var data = "data has been added pls check the sheet";
	async.series([
		
		 function setAuth(step) {
			// see notes below for authentication instructions!
		   var creds = require('./client_secret.json');
			// OR, if you cannot save the file locally (like on heroku)
			var creds_json = {
			  client_email: 'chmdemo@snappy-byway-200609.iam.gserviceaccount.com',
			  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7LzHnXY84gX9F\n7UrUYMhRoXTdZYX2fNVtq8NHU5Dm7/aOKu3jK0ahNJVs9FFztw15aMK0L/xRgNQR\nx2GyZWcys48zK4L14VuSLYsHpb4fEig5u6PHBtFEnshWQWperNTnMIh45jYFOxnN\nUi7jBqYlEJHHIYaMy6doXcSzcrKQtVaTROAZmCAdbnwN4WpHvyY6ah19lTRvXlUz\nVJ2ELSzPszoNLsBMmGU0VJ2fwE17gIw0s3KCFzdK9jp5YCQt1mJSMkblAQUphq+s\nkfcP8oTkRsLvAs+B0QELfV7lu0tAHnxaICaWk9KSRtNj/30dYcpH3O8TzRP045Dm\ng9RBO63JAgMBAAECggEAAmvyg3WliRO80arnn06GvO6fsE8UT/tut/HjT4CMZP55\nBD8YL4qTafnADqYtCRgWzamuLi5aP3QxGi9IC2quLnzd9wmisrtpB7+81xsc9fIy\nUMfljyk+ixqaSSpkvceS5BBPza+dxozMkUhVSLTg8KURm7/KabcnSe1/olozJvXZ\n97YWs5vO3VzDUfUko3xLH9bX7IkwuDTMK/oVKy8yC3HeLhlbIGVmSKnxJjwubTTA\naJkubQQbV8TvIhedv6M/NFGrctZKUyfbBuX8uvelNuFfouIf8Rio8a3NM/Kep0zw\nfUlnPmKuqntnufoRimnjxnBkhigin4MtJNnyyDpRUQKBgQDg20uhgcijWpHclz1U\ns+pPk/ODBmqRxO/TaU2iTD9L8Pe/TDvPtdfkFnlMZGz0049tgNUeCOOx4cdUpWdc\nB1tRTNH7VRHQMvyJWTicQ0e2OlPOTMCrQQ3swZppoWjEu9WrjY8cvqEJuZksiKzT\nY/uJmnc6yuxISfPATR38oF3c+QKBgQDVHCj52BTJ5BLNXarPmpHjyC0UQXa4b6AZ\nKZ/6klxkPkhBSJSrS4aEV99f0mr2HAS1+k32NhZQa+4gDhgBGda2a/UkWMwr9Yqp\nItjYE7JDUJasPmQpZQA1SRhl2YesK0Max4qmpbyl2SXB6krrs5u2hR1AeqYPmG21\n8gZHSi6bUQKBgAveJzDAC9nrVtWAugD1egF3OpwIw6kr7siGv004nwKgFkNnf6Sn\n4Vwtf3tztXh6jhBmg1kReQsTcpTaIglubfhtiIuuYsFNX5zUM7OzrV5F19SEooqn\nZVfApCi9Fy2DCHUEhLAss40y2Y3LLOv/U/BgUbitqyjplk7pAxMpV6rpAoGARxb7\nvEyOssJ4WzWR02s2m4udLhKgbeoeuAYgrc/BLldwdwalQXcSSnedtjNVJwA1uhbj\nhuyICQ/YAa1x6HwcGgJtZlCQ22Evfjh3qaz4XGg3uwGdHAnrRds6Xk9waMiNvBMw\nd2L2SUTkyYlEsNfba8l/9pBzcORiRL2VxpZCceECgYAVaAEFFRzMQCxeYQ7OIqWF\nzV6skVK5lgbZqn9Q5mJlATIBerNg9lH8+1DtpdkyzKKtijKmN91ca+Vfmncj35of\nPxWsjWzii/CSVxHZHqBLOBNQ7ca4en9H+8gMo5WvVqkV2+EOxbZl8fC8jqdNOJrb\n59UyiWLnvZF5r3d4OmHZCg==\n-----END PRIVATE KEY-----\n"
			}
		 
			doc.useServiceAccountAuth(creds, step);
		  },
		  function workingWithRows(step) {
			// google provides some query options
			sheet.getRows({
			  offset: 1,
			  orderby: 'col2'
			}, function( err, rows ){
			  console.log('Read '+rows.length+' rows');
		 
			  // the row is an object with keys set by the column headers
			  rows[0].SLNO = '1';
			  rows[0].PRODUCTNAME = 'apples';
			  rows[0].QUANTITY = '20';
			  rows[0].DATETIME = 'date'
			  rows[0].save(); // this is async
			  //console.log(rows[0]);
			  // deleting a row
			  //rows[0].del();  // this is async
		 
			  step();
			});
		  }
		], function(err){
			if( err ) {
			  console.log('Error: '+err);
			}
		});
	resolve(data);
  })
}
 
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
