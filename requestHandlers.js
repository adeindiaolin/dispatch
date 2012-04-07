var querystring = require("querystring");
var db_callers = require("./db");

function start(response, postData, queryParams) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function upload(response, postData, queryParams) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: "+
                 querystring.parse(postData).text);
  response.end();
}

function helloKookoo(response, postData, queryParams) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("<response><playtext>Welcome to the dispatch rickshaw service. Your location is being gathered. We will dispatch a rickshaw momentarily. Please enjoy some music.</playtext><hangup></hangup></response>");
  response.end();
}

function kookooRequest(response, postData, queryParams) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("The type of your request is: " + queryParams["event"]);
  if (queryParams.event == 'NewCall'){
    db_callers.insert_db(db_callers.db, queryParams.cid, queryParams);
  }
  response.end();
}

//exports.start = start;
//exports.upload = upload;
exports.helloKookoo = helloKookoo;
exports.kookooRequest = kookooRequest;
