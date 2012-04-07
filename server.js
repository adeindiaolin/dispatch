var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
                  postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });

  }
  var port = process.env.PORT || 8888;
  var couchdb = require('couchdb'),
      client = couchdb.createClient(5984, 'localhost'),
      db = client.db('test');
  http.createServer(onRequest).listen(port);
  console.log(port);
  console.log("Server has started.");
}

exports.start = start;
