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
          	      content: 'To make a split mirror backup in SUSPEND mode: \
Place the database tablespaces in backup mode. For example, to place tablespace users in backup mode, enter:\
\
ALTER TABLESPACE users BEGIN BACKUP;\
If you are backing up all of the tablespaces for your database, you can instead use:\
\
ALTER DATABASE BEGIN BACKUP;\
Caution:\
Do not use the ALTER SYSTEM SUSPEND statement as a substitute for placing a tablespace in backup mode.\
If your mirror system has problems with splitting a mirror while disk writes are occurring, then suspend the database. For example, issue the following statement:\
\
ALTER SYSTEM SUSPEND;\
Verify that the database is suspended by querying the V$INSTANCE view. For example:\
\
SELECT DATABASE_STATUS FROM V$INSTANCE;\
\
DATABASE_STATUS \
----------------- \
SUSPENDED \
Split the mirrors at the operating system or hardware level.\
\
End the database suspension. For example, issue the following statement:\
\
ALTER SYSTEM RESUME;\
Establish that the database is active by querying the V$INSTANCE view. For example, enter:\
\
SELECT DATABASE_STATUS FROM V$INSTANCE;'},
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
