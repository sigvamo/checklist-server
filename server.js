// Created by Aychin Gasimov

var express = require('express')
var server = express()

/* 
cid - condition id 
types:
  0 - Body content
  1 - Step
  2 - Input
  3 - Goto
  4 - Repeat some step or range of steps and continue 
*/

var dataSource = {
	id : 1,
	titel : 'First checklist',
	description : 'This is checklist to do something.',
	version : '1.0.0',
	variables : [{id: 1, name:'ORACLE_SID', runtime: false, required: true},
	             {id: 2, name:'ORACLE_HOME', runtime: false, required: true, default: '/home/oracle'},
	             {id: 3, name:'WORK_DIR', runtime: false, required: true},
	             {id: 4, name:'myVar', runtime: true, required: true}],
	body : [
             { beforesec: 0, content: 'It is body text'},
             { beforesec: 2, content: 'It is body text <em><strong>And it is some decorated text</strong></em> before sec 2'},
             { beforesec: -1, content: 'It is body text of the end <pre><code>select * from dual;</code></pre>'}
          ],
	sections : [
		{
		  pos : 1,
          titel : 'Section 1',
          conditions : [
            {id: 1, condition: '1=2'}
          ],
          contentmeta: [
             {id: 1,  type: 0 },
             {id: 2,  type: 1 },
             {id: 3,  type: 1 },
             {id: 4,  type: 0 },
             {id: 5,  type: 1 },
             {id: 7,  type: 0, cid: 1},
             {id: 8,  type: 1, cid: 1},
             {id: 9,  type: 1, cid: 1},
             {id: 10, type: 1, cid: 1},
             {id: 11, type: 1 },
             {id: 12, type: 0 },
             {id: 13, type: 1 },
             {id: 14, type: 1 },
             {id: 15, type: 1 },
             {id: 16, type: 0 },
             {id: 17, type: 1 },
             {id: 18, type: 1 },
             {id: 19, type: 0 }
          ],
          contentdata: [
             {id: 1, content: 'It is body <pre><code>function(a){return a+3}</code></pre> text of the section body'},
             {id: 2, titel: 'Titel of step 1', content: 'Content of step 1 $$WORK_DIR$$'},
             {id: 3, content: 'Contetnt of step 2'},
             {id: 4, content: 'It is body text before step 2 of the section body'},
             {id: 5, titel: 'Some actions here', content: 'To make a split mirror backup in SUSPEND mode: Place the database tablespaces in backup mode. <pre><code class="language-sql">export ORACLE_HOME=$$ORACLE_HOME$$        select tablespace_name, count(*), sum(bytes)/1024/1024 from dba_segments where owner = "INFINIWORX" group by tablespace_name;</code></pre>For example, to place tablespace users in backup mode, enter:ALTER TABLESPACE users BEGIN BACKUP;If you are backing up all of the tablespaces for your database, you can $$ORACLE_SID$$ instead use:ALTER DATABASE BEGIN BACKUP;Caution:Do not use the ALTER SYSTEM SUSPEND statement as a substitute for placing a tablespace in backup mode.If your mirror system has problems with splitting a mirror while disk writes are occurring, then suspend the database. For example, issue the following statement:ALTER SYSTEM SUSPEND;Verify that the database is suspended by querying the V$INSTANCE view. For example:SELECT DATABASE_STATUS FROM V$INSTANCE;DATABASE_STATUS ----------------- SUSPENDED Split the mirrors at the operating system or hardware level.End the database suspension. For example, issue the following statement:ALTER SYSTEM RESUME;Establish that the database is active by querying the V$INSTANCE view. For example, enter:SELECT DATABASE_STATUS FROM V$INSTANCE;'},
             {id: 7, content: 'If condition id 1 is true we are here'},
             {id: 8, content: 'If condition id 1 is true we are here'},
             {id: 9, content: 'If condition id 1 is true we are here'},
             {id: 10, content: 'If condition id 1 is true we are here'},
             {id: 11, content: 'Some content goes here'},
             {id: 12, content: 'Some content goes here'},
             {id: 13, content: 'It is body text $$ORACLE_HOME$$ before step 3 <pre><code>function(a){return a+3}</code></pre> of the section body'},
             {id: 14, content: 'sdkfjskl afösldk fsldafja<pre><code class="language-javascript">var cow = new Mammal( "moo", { legs: 4} );</code></pre>'},
             {id: 15, titel: 'We are doing tralala here', content: 'Some content goes here'},
             {id: 16, content: 'Some content goes here'},
             {id: 17, content: 'Some content goes here'},
             {id: 18, content: 'Some content goes here'},
             {id: 19, content: 'It is last body text of the section body <pre><code>function(a){return a+3}</code></pre>'}
          ]

		},
       {
       	  pos : 2,
          titel : 'Section 2',
          conditions : [
            {id: 1, condition: 'VAR[4] > 10'}
          ],
          contentmeta: [
             {id: 1,  type: 0},
             {id: 2,  type: 1},
             {id: 3,  type: 1},
             {id: 5,  type: 2, vars: [4], cid: 1},
             {id: 6,  type: 3, goto: 2, cid: 1},
             {id: 4,  type: 0}
          ],
          contentdata: [
             {id: 1, content: 'It is body <pre><code>function(a){return a+3}</code></pre> text of the section body'},
             {id: 2, titel: 'Titel of step 1', content: 'Content of step 1 $$WORK_DIR$$'},
             {id: 3, content: 'Contetnt of step 2'},
             {id: 4, content: 'It is body text before $$ORACLE_HOME$$ step 2 of the section body'},
             {id: 5, content: 'Please enter the value for variable: myVar'}
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











/*

sections : [
		{
		  pos : 1,
          titel : 'Section 1',
          contentmeta: [
             {id: 1,  type: 0, pid: 0, pos: 1},
             {id: 2,  type: 1, pid: 0, pos: 2, stepid: 1},
             {id: 3,  type: 1, pid: 0, pos: 3, stepid: 2},
             {id: 4,  type: 0, pid: 0, pos: 4},
             {id: 5,  type: 1, pid: 0, pos: 5, stepid: 3},
             {id: 6,  type: 2, pid: 0, pos: 6},
             {id: 7,  type: 0, pid: 6, pos: 1, branch: 1},
             {id: 8,  type: 1, pid: 6, pos: 2, branch: 1, stepid: 1},
             {id: 9,  type: 1, pid: 6, pos: 3, branch: 1, stepid: 2},
             {id: 10, type: 1, pid: 6, pos: 1, branch: 2, stepid: 1},
             {id: 11, type: 1, pid: 6, pos: 2, branch: 2, stepid: 2},
             {id: 12, type: 0, pid: 6, pos: 3, branch: 2},
             {id: 13, type: 0, pid: 6, pos: 1, branch: 3},
             {id: 14, type: 1, pid: 6, pos: 2, branch: 3, stepid: 1},
             {id: 15, type: 1, pid: 6, pos: 3, branch: 3, stepid: 2},
             {id: 16, type: 0, pid: 0, pos: 7},
             {id: 17, type: 1, pid: 0, pos: 8, stepid: 4},
             {id: 18, type: 1, pid: 0, pos: 9, stepid: 5},
             {id: 19, type: 0, pid: 0, pos: 10}
          ],
          contentdata: [
             {id: 1, content: 'It is body <pre><code>function(a){return a+3}</code></pre> text of the section body'},
             {id: 2, titel: 'Titel of step 1', content: 'Content of step 1 $$WORK_DIR$$'},
             {id: 3, content: 'Contetnt of step 2'},
             {id: 4, content: 'It is body text before step 2 of the section body'},
             {id: 5, titel: 'Some actions here', content: 'To make a split mirror backup in SUSPEND mode: Place the database tablespaces in backup mode. <pre><code class="language-sql">export ORACLE_HOME=$$ORACLE_HOME$$        select tablespace_name, count(*), sum(bytes)/1024/1024 from dba_segments where owner = "INFINIWORX" group by tablespace_name;</code></pre>For example, to place tablespace users in backup mode, enter:ALTER TABLESPACE users BEGIN BACKUP;If you are backing up all of the tablespaces for your database, you can $$ORACLE_SID$$ instead use:ALTER DATABASE BEGIN BACKUP;Caution:Do not use the ALTER SYSTEM SUSPEND statement as a substitute for placing a tablespace in backup mode.If your mirror system has problems with splitting a mirror while disk writes are occurring, then suspend the database. For example, issue the following statement:ALTER SYSTEM SUSPEND;Verify that the database is suspended by querying the V$INSTANCE view. For example:SELECT DATABASE_STATUS FROM V$INSTANCE;DATABASE_STATUS ----------------- SUSPENDED Split the mirrors at the operating system or hardware level.End the database suspension. For example, issue the following statement:ALTER SYSTEM RESUME;Establish that the database is active by querying the V$INSTANCE view. For example, enter:SELECT DATABASE_STATUS FROM V$INSTANCE;'},
             {id: 6, content: 'Here we will define condition and depending on condition one of 3 branches will be used.'},
             {id: 7, content: 'Some content goes here'},
             {id: 8, content: 'Some content goes here'},
             {id: 9, content: 'Some content goes here'},
             {id: 10, content: 'Some content goes here'},
             {id: 11, content: 'Some content goes here'},
             {id: 12, content: 'Some content goes here'},
             {id: 13, content: 'It is body text $$ORACLE_HOME$$ before step 3 <pre><code>function(a){return a+3}</code></pre> of the section body'},
             {id: 14, content: 'sdkfjskl afösldk fsldafja<pre><code class="language-javascript">var cow = new Mammal( "moo", { legs: 4} );</code></pre>'},
             {id: 15, titel: 'We are doing tralala here', content: 'Some content goes here'},
             {id: 16, content: 'Some content goes here'},
             {id: 17, content: 'Some content goes here'},
             {id: 18, content: 'Some content goes here'},
             {id: 19, content: 'It is last body text of the section body <pre><code>function(a){return a+3}</code></pre>'}
          ]

		}

		*/