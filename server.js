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
	             {id: 4, name:'myVar', runtime: true, required: true},
	             {id: 5, name:'NUM_OF_TAB', runtime: true, required: true},
	             {id: 6, name:'IS_DONE', runtime: true, required: true, default: 'YES'}
	             ],

	body : [
             { content: 'It is body text <pre><code>select * from dual;</code></pre> tralala'},
             { section: 1},
             { content: 'It is body text <em><strong>And it is some decorated text</strong></em> before sec 2'},
             { section: 2},
             { content: 'It is body text of the end <pre><code>select * from dual;</code></pre>'}
          ],
	sections : [
		{
		  pos : 1,
          titel : 'Section 1',
          conditions : [
            {id: 1, condition: '1=2'},
            {id: 2, condition: '$$IS_DONE$$="NO"'}
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
             {id: 30, type: 2, vars: [6]},
             {id: 29, type: 4, repeat: [1,13], cid: 2},
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
             {id: 19, content: 'It is last body text of the section body <pre><code>function(a){return a+3}</code></pre>'},
             {id: 30, content: 'Is previous steps done?'}
          ]

		},
       {
       	  pos : 2,
          titel : 'Section 2',
          conditions : [
            {id: 1, condition: '$$myVar$$ > 10'}
          ],
          contentmeta: [
             {id: 1,  type: 0},
             {id: 2,  type: 1},
             {id: 3,  type: 1},
             {id: 5,  type: 2, vars: [4,5], cid: 1},
             {id: 6,  type: 3, goto: 2, cid: 1},
             {id: 4,  type: 0}
          ],
          contentdata: [
             {id: 1, content: 'It is body <pre><code>function(a){return a+3}</code></pre> text of the section body'},
             {id: 2, titel: 'Titel of step 1', content: 'Content of step 1 $$WORK_DIR$$'},
             {id: 3, content: 'Contetnt of step 2'},
             {id: 4, content: 'It is body text before $$ORACLE_HOME$$ step 2 of the section body'},
             {id: 5, content: 'Please enter the $$ORACLE_HOME$$ value for variable: myVar'}
          ]
		}
	]
}



dataSource = {
  "id": 1,
  "titel": "First checklist",
  "description": "This is checklist to do something.",
  "version": "1.0.0",
  "variables": [
    {
      "id": 1,
      "name": "ORACLE_SID",
      "runtime": false,
      "required": true
    },
    {
      "id": 2,
      "name": "ORACLE_HOME",
      "runtime": false,
      "required": true,
      "default": "/home/oracle"
    },
    {
      "id": 3,
      "name": "WORK_DIR",
      "runtime": false,
      "required": true
    },
    {
      "id": 4,
      "name": "myVar",
      "runtime": true,
      "required": true
    },
    {
      "id": 5,
      "name": "NUM_OF_TAB",
      "runtime": true,
      "required": true
    },
    {
      "id": 6,
      "name": "IS_DONE",
      "runtime": true,
      "required": true,
      "default": "YES"
    }
  ],
  "body": [
    {
      "content": "<p>It is body text</p><pre><code>import request from \\'request\\'\\nimport Store from \\'./reduxStore.js\\'\\nimport hljs from \\'highlightjs\\'\\nimport jsStringEscape from \\'js-string-escape\\'\\nimport * as globals from \\'./globals.js\\'\\nimport * as Actions from \\'./redux-actions.js\\'\\n\\n\\nexport var alertMessage = function (message, type=globals.INFO, visible=true) {\\n  Store.dispatch(Actions.actionSetAlert({type: type, visible: visible, message: message}))\\n}\\n\\nexport var closeMessage = function () {\\n  Store.dispatch(Actions.actionSetAlert({visible: false}))\\n}\\n\\n// getAPI is function used to get data from API, all data passed in JSON format.\\n// Function gets as argument \\\"action\\\" which is objects of next form:\\n//   {func: function(data) { actions with data}, uri: \\'some uri\\'}\\n// For each new action handler must be added in this function.\\nexport var getAPI = function (action, rCounter=0, retryCount=globals.apiReqRetry, retryTimeOut=globals.apiReqTimeout) {\\n\tif (rCounter &lt; retryCount) {\\n\tconsole.log(\\'Getting data from \\' + action.uri +\\', try:\\', rCounter);\\n\trequest\\n           .get({uri: action.uri, json: true},\\n           \t   function (error, response, data) {\\n           \t   \t  if (error) { \\n           \t   \t  \t   console.log(\\'Cannot get data from API, Error: \\', error);\\n                       alertMessage(\\'Cannot get data from the server, will try after \\' + retryTimeOut(rCounter)/1000 + \\' sec. Try number: \\' + rCounter, globals.ERRO)\\n                       rCounter++\\n                       // Executing recursively loadChecklist with timeout. Passing arguments in setTimeout\\n                       setTimeout(getAPI, retryTimeOut(rCounter), action, rCounter, retryCount, retryTimeOut)\\n           \t   \t  \t   return false;\\n           \t   \t  \t}\\n\\n           \t   \t  if (response.statusCode === 200 &amp;&amp; typeof data === \\\"object\\\") {\\n           \t   \t  \t   Store.dispatch(Actions.actionSetAlert({visible: false }))\\n           \t   \t  \t   action.func(data)\\n                       return true\\n                  } else {\\n                       console.log(\\'Cannot get data from API: \\', response.body)\\n                       alertMessage(\\'Cannot get data from the server, will try after \\' + retryTimeOut(rCounter)/1000 + \\' sec. Try number: \\' + rCounter, globals.ERRO)\\n                       rCounter++\\n                       // Executing recursively loadChecklist with timeout. Passing arguments in setTimeout\\n                       setTimeout(getAPI, retryTimeOut(rCounter), action, rCounter, retryCount, retryTimeOut)\\n                       return false\\n                  }\\n           \t   })\\n      \\n    } else\\n      {\\n           alertMessage(\\'Cannot get data from the server after all \\' + retryCount + \\' tries! Please try to comeback later.\\', globals.ERRO)\\n           console.log(\\'RETRIES FINISHED!\\')\\n       }\\n    \\n}\\n\\n/* This function used to apply code highlighting using highlightBlock function of the highlight.js.\\n   It receives DOM element and scans all children it will find &lt;pre&gt;&lt;code&gt; pair and apply highlighting\\n   on &lt;code&gt; element. If second parameter is true then initHighlighting.called = false will be executed. */\\nexport var applyHLJS = function(element, update) {\\n  if (element == null) { console.log(\\'WARNING\\', \\'applyHLJS\\', \\'element argument cannot be null\\'); return; }\\n  let el;\\n    for (var i = 0; i &lt; element.children.length; i++) {\\n        el = element.children[i]\\n      if ( el.tagName == \\'PRE\\' ) {\\n           if ( el.children[0].tagName == \\'CODE\\' ) {\\n            update ? hljs.initHighlighting.called = false : null\\n            hljs.highlightBlock(el.children[0])\\n          } \\n      }\\n    }\\n}\\n\\n/* This function will get id of the element and will scroll it to the screen center and make blink effect.\\n   Was create to navigate on Sections and Steps */\\nexport var navigateToElement = function(id, blink=true) {\\n  let el = document.getElementById(id)\\n  el.style.animation = null\\n  el.scrollToCenter()\\n  if (blink == true) {\\n     el.style.animation = \\\"ag-bg-transition-nav 1s\\\"\\n  }\\n}\\n\\nexport var sleep = function(time) {\\n  return new Promise((resolve) =&gt; setTimeout(resolve, time));\\n}\\n\\n\\nexport var findVariables = function (variable) {\\n  var checklist = Store.getState().checklist\\n  \\n  var res = {}\\n\\n  res.sections = checklist.sections.reduce((prev, curr) =&gt; {\\n      \\n      var contentIncludesVAR = curr.contentdata.reduce((prv, cr) =&gt; {\\n         if (cr.content.search(new RegExp(\\'\\\\\\\\$\\\\\\\\$\\' + variable + \\'\\\\\\\\$\\\\\\\\$\\', \\'g\\')) != -1) {\\n              prv.push(Object.assign(cr, getContentEntryMeta(curr, cr.id)))\\n             }\\n         return prv     \\n      }, [])\\n      \\n      if (contentIncludesVAR.length &gt; 0 ) {\\n         prev[curr.pos] = contentIncludesVAR\\n      }\\n\\n      return prev\\n  }, {})\\n\\n return res\\n\\n}\\n\\n\\nexport var getSectionByPos = function (checklist, sectionPos) {\\n  \\n  let res\\n   checklist.sections.find((section) =&gt; { \\n             if (section.pos == sectionPos) {\\n                res = section\\n             }\\n         })\\n\\n   return res || \\\"undef\\\"\\n\\n}\\n\\n\\nexport var getVariableById = function (id) {\\n  var checklist = Store.getState().checklist\\n  \\n  let res\\n   checklist.variables.find((b) =&gt; { \\n             if (b.id == id) {\\n                res = b.name\\n             }\\n         })\\n\\n   return res || \\\"undef\\\"\\n\\n}\\n\\n\\n// Function to highlit variables\\nexport var showVariables = function (text) {\\n   function replacer(match) {\\n     return \\'&lt;span class=\\\"ag-variable\\\" title=\\\"Placeholder for variable \\' + match + \\'\\\"&gt;&lt;code&gt;\\' + match.replace(/\\\\$/g, \\'\\') + \\'&lt;/code&gt;&lt;/span&gt;\\'\\n   }\\n   return text.replace(/\\\\$\\\\$([A-Za-z0-9_]+)\\\\$\\\\$/g, replacer)\\n} \\n\\n\\n/* jQuery function, to keep Navigation always on top */\\nexport var jQsetOnScroll = function(params={}) {\\n  /* eslint-disable */\\n  if (params.init === true) {\\n       $(\\\"#Navigation\\\").css({\\\"maxHeight\\\": 300});\\n       //$(\\\"#Navigation\\\").height(300);\\n       var checklistMarginTop = $(\\\"#Checklist\\\").css(\\\"margin-top\\\")\\n       let offset = parseFloat(checklistMarginTop.replace(/[^0-9.]+/g,\\'\\'));\\n       $(\\\"#Navigation\\\").css({\\\"margin-top\\\": offset})\\n       $(window).off(\\'scroll\\')\\n  } else {\\n     $(\\\"#Navigation\\\").css({\\\"maxHeight\\\": $(window).height() - 30});\\n     $(window).scroll(function(){\\n     $(\\\"#Navigation\\\").css({\\\"maxHeight\\\": $(window).height() - 30});\\n     //$(\\\"#Navigation\\\").height($(window).height() - 30);\\n     var checklistTop = $(\\\"#Checklist\\\").offset().top\\n     var checklistHeight = $(\\\"#Checklist\\\").height()\\n     var checklistMarginTop = $(\\\"#Checklist\\\").css(\\\"margin-top\\\")\\n     let offset = parseFloat(checklistMarginTop.replace(/[^0-9.]+/g,\\'\\'));\\n     var windowTop = $(window).scrollTop();\\n     (windowTop &lt; checklistTop) ? offset += 0 : offset += windowTop-checklistTop\\n     if (offset &gt; checklistTop + checklistHeight - $(\\\"#Navigation\\\").height() ) { return }\\n       $(\\\"#Navigation\\\")\\n              .stop()      \\n              .animate({\\\"marginTop\\\": (offset + \\\"px\\\")}, 0 );\\n     })\\n  }\\n}\\n\\n\\n\\n// Manage Checklist section object. Function to get metadata Object for specific id\\nexport var getContentEntryMeta = function (section, id){\\n   let retVal\\n   section.contentmeta.find((b) =&gt; { \\n             if (b.id == id) {\\n                retVal = b\\n             }\\n         })\\n   return retVal || -1\\n}\\n\\n// Manage Checklist section object. Function to get content Object for specific id\\nexport var getContentEntryData = function (section, id){\\n   let retVal\\n   section.contentdata.find((b) =&gt; { \\n             if (b.id == id) {\\n                retVal = b\\n             }\\n         })\\n   return retVal || -1\\n }\\n\\n// Checklist condition selector. Provide conditions object and id of the condition it will return the condition (string)\\nexport var getCondition = function (conditions, cid){\\n   let retVal\\n   conditions.find((b) =&gt; { \\n             if (b.id == cid) {\\n                retVal = b.condition\\n             }\\n         })\\n   return retVal || -1\\n }\\n\\n// Function to evaluate condition. Input is string condition, which will be evaluated and returned true or false\\nexport var evalCondition = function (condition){\\n  function evaluate(cond) {\\n     let fBody = \\'if (\\' + cond + \\') { return true } else { return false }\\'\\n     return new Function(fBody)();\\n  }\\n   return evaluate(condition)\\n }\\n\\n// Remove element from array by value.\\nexport var delElement = function (arr, val, key=null){\\n  \\n  if ( key != null ) {\\n     for(var i = arr.length - 1; i &gt;= 0; i--) {\\n        if(arr[i][key] === val) {\\n          arr.splice(i, 1);\\n        }\\n     }\\n  }\\n  \\n}\\n\\n// Find StepID by entry id in specified mapping object\\nexport var getStepIDbyEntryID = function (obj, section, id){\\n   let retVal\\n   obj.find((b) =&gt; { \\n             if (b.section == section) {\\n                retVal = b.mapping[id]\\n             }\\n         })\\n   return retVal || -1\\n }\\n\\n\\n// Find StepID by entry id frm current REDUX Store\\nexport var getStepIDbyEntryIDfromStore = function (section, id){\\n   let obj = Store.getState().id2stepidMapping\\n   let retVal\\n   obj.find((b) =&gt; { \\n             if (b.section == section) {\\n                retVal = b.mapping[id]\\n             }\\n         })\\n   return retVal || -1\\n }\\n\\nexport var genId2StepIdMapping = function (checklist){\\n  if (! checklist) {return null}\\n  if (checklist.sections.length == 0) {return null}\\n      var id2stepId = checklist.sections.map((section, ind)=&gt;{\\n         var stepID = 0\\n         let tmpObj={}\\n         section.contentmeta.map((entry, ind) =&gt; {\\n           if (entry.type === 1) {\\n               stepID++ \\n               tmpObj[entry.id] = stepID\\n             }\\n           })\\n           return {section: section.pos, mapping: tmpObj}\\n         })\\n  return id2stepId\\n}\\n\\n// This function used to get current values of different entries in checklist\\nexport var getCklstCurrent = function (what, pos) {\\n  let checklist = Store.getState()[\\'checklist\\']\\n  let retVal\\n   switch (what) {\\n     case globals.CKLST_TITEL:\\n       retVal = [checklist.titel, checklist.description]\\n       break;\\n     case globals.CKLST_BODY_CONTENT:\\n       retVal = showContent(checklist.body[pos].content)\\n       break;\\n   }\\n  return retVal\\n}\\n\\n\\nexport var cklstAdminEngine = function (action, what, payload) {\\n   let tmpChecklist = Object.assign({}, Store.getState()[\\'checklist\\'])\\n   switch (what) {\\n     case globals.CKLST_TITEL:\\n         switch (action) {\\n            case \\'ADD\\':\\n                tmpChecklist.titel=payload[0]\\n                tmpChecklist.description=payload[1]\\n              break;   \\n         }\\n\\n      break;\\n     case globals.CKLST_BODY_CONTENT:\\n         switch (action) {\\n            case \\'ADD\\':\\n                /* We will not add body content if the last entry is body content. We will add it only \\n                   after section or to the empty body*/  \\n                // Check if body not exists or has zero length\\n                if (! (\\'body\\' in tmpChecklist) || tmpChecklist[\\'body\\'].length===0 ) {\\n                  tmpChecklist[\\'body\\'].push({content: payload})\\n                }\\n              break;\\n            case \\'MODIFY\\':\\n               tmpChecklist.body[0].content = jsonContent(payload)\\n               console.copy( tmpChecklist )\\n              \\n\\n\\n              break;\\n          }\\n  \\n     break;\\n\\n   }\\n  Store.dispatch(Actions.actionChangeChecklist(tmpChecklist))\\n}\\n\\n\\nexport var jsonContent = function(plainContent) {\\n  return jsStringEscape(plainContent)\\n}\\n\\nexport var showContent = function(rawContent) {\\n  return eval(\\'\\\"\\' + rawContent + \\'\\\"\\')\\n}\\n\\nexport var printREDUXStore = function () {\\n  Store.dispatch(Actions.actionRemoveCurrentChecklist())\\n  console.log(Store.getState())\\n}\\n\\n</code></pre><p>tralala</p>"
    },
    {
      "section": 1
    },
    {
      "content": "It is body text <em><strong>And it is some decorated text</strong></em> before sec 2"
    },
    {
      "section": 2
    },
    {
      "content": "It is body text of the end <pre><code>select * from dual;</code></pre>"
    }
  ],
  "sections": [
    {
      "pos": 1,
      "titel": "Section 1",
      "conditions": [
        {
          "id": 1,
          "condition": "1=2"
        },
        {
          "id": 2,
          "condition": "$$IS_DONE$$=\"NO\""
        }
      ],
      "contentmeta": [
        {
          "id": 1,
          "type": 0
        },
        {
          "id": 2,
          "type": 1
        },
        {
          "id": 3,
          "type": 1
        },
        {
          "id": 4,
          "type": 0
        },
        {
          "id": 5,
          "type": 1
        },
        {
          "id": 7,
          "type": 0,
          "cid": 1
        },
        {
          "id": 8,
          "type": 1,
          "cid": 1
        },
        {
          "id": 9,
          "type": 1,
          "cid": 1
        },
        {
          "id": 10,
          "type": 1,
          "cid": 1
        },
        {
          "id": 11,
          "type": 1
        },
        {
          "id": 12,
          "type": 0
        },
        {
          "id": 13,
          "type": 1
        },
        {
          "id": 14,
          "type": 1
        },
        {
          "id": 15,
          "type": 1
        },
        {
          "id": 30,
          "type": 2,
          "vars": [
            6
          ]
        },
        {
          "id": 29,
          "type": 4,
          "repeat": [
            1,
            13
          ],
          "cid": 2
        },
        {
          "id": 16,
          "type": 0
        },
        {
          "id": 17,
          "type": 1
        },
        {
          "id": 18,
          "type": 1
        },
        {
          "id": 19,
          "type": 0
        }
      ],
      "contentdata": [
        {
          "id": 1,
          "content": "It is body <pre><code>function(a){return a+3}</code></pre> text of the section body"
        },
        {
          "id": 2,
          "titel": "Titel of step 1",
          "content": "Content of step 1 $$WORK_DIR$$"
        },
        {
          "id": 3,
          "content": "Contetnt of step 2"
        },
        {
          "id": 4,
          "content": "It is body text before step 2 of the section body"
        },
        {
          "id": 5,
          "titel": "Some actions here",
          "content": "To make a split mirror backup in SUSPEND mode: Place the database tablespaces in backup mode. <pre><code class=\"language-sql\">export ORACLE_HOME=$$ORACLE_HOME$$        select tablespace_name, count(*), sum(bytes)/1024/1024 from dba_segments where owner = \"INFINIWORX\" group by tablespace_name;</code></pre>For example, to place tablespace users in backup mode, enter:ALTER TABLESPACE users BEGIN BACKUP;If you are backing up all of the tablespaces for your database, you can $$ORACLE_SID$$ instead use:ALTER DATABASE BEGIN BACKUP;Caution:Do not use the ALTER SYSTEM SUSPEND statement as a substitute for placing a tablespace in backup mode.If your mirror system has problems with splitting a mirror while disk writes are occurring, then suspend the database. For example, issue the following statement:ALTER SYSTEM SUSPEND;Verify that the database is suspended by querying the V$INSTANCE view. For example:SELECT DATABASE_STATUS FROM V$INSTANCE;DATABASE_STATUS ----------------- SUSPENDED Split the mirrors at the operating system or hardware level.End the database suspension. For example, issue the following statement:ALTER SYSTEM RESUME;Establish that the database is active by querying the V$INSTANCE view. For example, enter:SELECT DATABASE_STATUS FROM V$INSTANCE;"
        },
        {
          "id": 7,
          "content": "If condition id 1 is true we are here"
        },
        {
          "id": 8,
          "content": "If condition id 1 is true we are here"
        },
        {
          "id": 9,
          "content": "If condition id 1 is true we are here"
        },
        {
          "id": 10,
          "content": "If condition id 1 is true we are here"
        },
        {
          "id": 11,
          "content": "Some content goes here"
        },
        {
          "id": 12,
          "content": "Some content goes here"
        },
        {
          "id": 13,
          "content": "It is body text $$ORACLE_HOME$$ before step 3 <pre><code>function(a){return a+3}</code></pre> of the section body"
        },
        {
          "id": 14,
          "content": "sdkfjskl afösldk fsldafja<pre><code class=\"language-javascript\">var cow = new Mammal( \"moo\", { legs: 4} );</code></pre>"
        },
        {
          "id": 15,
          "titel": "We are doing tralala here",
          "content": "Some content goes here"
        },
        {
          "id": 16,
          "content": "Some content goes here"
        },
        {
          "id": 17,
          "content": "Some content goes here"
        },
        {
          "id": 18,
          "content": "Some content goes here"
        },
        {
          "id": 19,
          "content": "It is last body text of the section body <pre><code>function(a){return a+3}</code></pre>"
        },
        {
          "id": 30,
          "content": "Is previous steps done?"
        }
      ]
    },
    {
      "pos": 2,
      "titel": "Section 2",
      "conditions": [
        {
          "id": 1,
          "condition": "$$myVar$$ > 10"
        }
      ],
      "contentmeta": [
        {
          "id": 1,
          "type": 0
        },
        {
          "id": 2,
          "type": 1
        },
        {
          "id": 3,
          "type": 1
        },
        {
          "id": 5,
          "type": 2,
          "vars": [
            4,
            5
          ],
          "cid": 1
        },
        {
          "id": 6,
          "type": 3,
          "goto": 2,
          "cid": 1
        },
        {
          "id": 4,
          "type": 0
        }
      ],
      "contentdata": [
        {
          "id": 1,
          "content": "It is body <pre><code>function(a){return a+3}</code></pre> text of the section body"
        },
        {
          "id": 2,
          "titel": "Titel of step 1",
          "content": "Content of step 1 $$WORK_DIR$$"
        },
        {
          "id": 3,
          "content": "Contetnt of step 2"
        },
        {
          "id": 4,
          "content": "It is body text before $$ORACLE_HOME$$ step 2 of the section body"
        },
        {
          "id": 5,
          "content": "Please enter the $$ORACLE_HOME$$ value for variable: myVar"
        }
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