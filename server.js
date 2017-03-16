// Created by Aychin Gasimov

var express = require('express')
var server = express()


var dataSource = {
	id : 1,
	titel : 'First checklist',
	version : '1.0.0',
	sections : [ 
		{
		  pos : 1,
          titel : 'Section 1',
          steps : [
          	    { pos : 1,
          		  titel: 'Step 1',
          	      content: 'Do something 1'},
          	    { pos : 3,
          		  titel: 'Step 3',
          	      content: 'Do something 3'},
          	    { pos : 2,
          		  titel: 'Step 2',
          	      content: 'Do something 2'}
          ]
		},
       {
       	  pos : 2,
          titel : 'Section 2',
          steps : [
          	    { pos : 1,
          		  titel: 'Step 1',
          	      content: 'Do something 1'},
          	    { pos : 2,
          		  titel: null,
          	      content: 'Do something 2'}
          ]
		}
	]
}

//console.log(dataSource.sections['1'].steps['1'].content)

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

server.use(allowCrossDomain)

server.get('/int-api/:key=:value', function (req, res) {
	console.log(req.params)
	var resData = parseIntAPI(req.params)
	if (resData.valid) {
        res.json(resData.data)
	} else {
		res.end("Wrong request")
	}
})

server.get('/int-api/:key', function (req, res) {
	console.log(req.params)
	var resData = parseIntAPI(req.params)
	if (resData.valid) {
        res.json(resData.data)
	} else {
		res.end("Wrong request")
	}
})


var parseIntAPI = function (params) {
	var resData = {}
	switch (params.key) {
      case 'getData':
              resData.valid = true
              resData.data = dataSource
              break;
      default:
              resData.valid = false
              break;
	}
	return resData
}

server.listen(2000)
