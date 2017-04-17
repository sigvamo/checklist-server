// Created by Aychin Gasimov

var express = require('express')
var server = express()


var dataSource = {
	id : 1,
	titel : 'First checklist',
	description : 'This is checklist to do something.',
	version : '1.0.0',
	variables : [{id: 1, name:'ORACLE_SID'},
	             {id: 2, name:'ORACLE_HOME'},
	             {id: 3, name:'WORK_DIR'}],
	body : [
             { beforesec: 0, content: 'It is body text'},
             { beforesec: 2, content: 'It is body text <em><strong>And it is some decorated text</strong></em> before sec 2'},
             { beforesec: -1, content: 'It is body text of the end <pre><code>select * from dual;</code></pre>'}
          ],
	sections : [
		{
		  pos : 1,
          titel : 'Section 1',
          contentmeta: [
             {id: 1, type: 0, pid: 0, pos: 1},
             {id: 2, type: 1, pid: 0, pos: 2, stepid: 1},
             {id: 3, type: 1, pid: 0, pos: 3, stepid: 2},
             {id: 4, type: 0, pid: 0, pos: 4},
             {id: 5, type: 1, pid: 0, pos: 5, stepid: 3},
             {id: 6, type: 2, pid: 0, pos: 6},
             {id: 7, type: 0, pid: 6, pos: 1, branch: 1},
             {id: 8, type: 1, pid: 6, pos: 2, branch: 1, stepid: 1},
             {id: 9, type: 1, pid: 6, pos: 3, branch: 1, stepid: 2},
             {id: 10, type: 1, pid: 6, pos: 1, branch: 2, stepid: 1},
             {id: 11, type: 1, pid: 6, pos: 2, branch: 2, stepid: 2},
             {id: 12, type: 0, pid: 6, pos: 3, branch: 2},
             {id: 13, type: 0, pid: 6, pos: 1, branch: 3},
             {id: 11, type: 1, pid: 6, pos: 2, branch: 3, stepid: 1},
             {id: 12, type: 1, pid: 6, pos: 3, branch: 3, stepid: 2},
             {id: 13, type: 0, pid: 0, pos: 7},
             {id: 14, type: 1, pid: 0, pos: 8, stepid: 4},
             {id: 15, type: 1, pid: 0, pos: 9, stepid: 5},
             {id: 16, type: 0, pid: 0, pos: 10}
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
             {id: 11, content: 'sdkfjskl afösldk fsldafja<pre><code class="language-javascript">var cow = new Mammal( "moo", { legs: 4} );</code></pre>'},
             {id: 12, titel: 'We are doing tralala here' content: 'Some content goes here'},
             {id: 13, content: 'Some content goes here'},
             {id: 14, content: 'Some content goes here'},
             {id: 15, content: 'Some content goes here'},
             {id: 16, content: 'It is last body text of the section body <pre><code>function(a){return a+3}</code></pre>'}
          ]

		},
       {
       	  pos : 2,
          titel : 'Section 2',
          steps : [
          	    { id : 4,
          	      pos : 1,
          		  titel: 'Step 1',
          	      content: '<h1>Apollo 11</h1><p><strong>Apollo 11<sup>1</sup></strong>&nbsp;was the spaceflight that landed the first humans, Americans <em><strong>Neil Armstrong</strong></em> and <em><strong>Buzz Aldrin</strong></em>, on the Moon on <u>July 20, 1969, at 20:18 UTC</u>. Armstrong became the first to step onto the lunar surface 6 hours later on <u>July 21 at 02:56 UTC</u>.</p><p>Armstrong spent about <s>three and a half</s> <u>two and a half hours</u> outside the spacecraft, Aldrin slightly less; and together they collected 47.5 pounds (21.5&nbsp;kg) of lunar material for return to Earth. A third member of the mission, <em><strong>Michael Collins</strong></em>, piloted the command spacecraft alone in lunar orbit until Armstrong and Aldrin returned to it for the trip back to Earth.</p><h2>Broadcasting and <em>quotes</em> <a id="quotes" name="quotes"></a></h2><p>Broadcast on live TV to a world-wide audience, Armstrong stepped onto the lunar surface and described the event as:</p><blockquote><p>One small step for [a] man, one giant leap for mankind.</p></blockquote><p>Apollo 11 effectively ended the <em>Space Race</em> and fulfilled a national goal proposed in 1961 by the late U.S. President John F. Kennedy in a speech before the United States Congress:</p><blockquote><p>[...] before this decade is out, of landing a man on the Moon and returning him safely to the Earth.</p></blockquote><hr /><p><small><sup>1&nbsp;</sup>Source: <a href="http://en.wikipedia.org/wiki/Apollo_11">Wikipedia.org</a></small></p>'},
          	    { id : 5,
          	      pos : 2,
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
