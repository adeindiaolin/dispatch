var db_callers = require("./db");



function kookooRequest(response, postData, queryParams) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("<response><playtext>Welcome to the dispatch rickshaw service. Your location is being gathered. We will dispatch a rickshaw momentarily. Please enjoy some music.</playtext><hangup></hangup></response>");
  //response.write("The type of your request is: " + queryParams["event"]);
  if (queryParams.event == 'NewCall'){
    db_callers.insert_db(db_callers.db, queryParams.cid, queryParams);
  }
  response.end();
}

//exports.start = start;
//exports.upload = upload;
exports.helloKookoo = helloKookoo;
exports.kookooRequest = kookooRequest;

