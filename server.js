var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(route, handle) {
    
    function onRequest(request, response) {
    
        var postData = "";
        var pathname = url.parse(request.url).pathname
        var queryParams = querystring.parse(url.parse(request.url).query)

        console.log("Request for " + pathname + " received.");
        console.log("Params received: " + JSON.stringify(queryParams));
        
        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+ 
                postDataChunk + "'.");
        });

        request.addListener("end", function() {
            route(handle, pathname, queryParams, response, postData);
        });

    }
    
    var port = process.env.PORT || 8888;

    http.createServer(onRequest).listen(port);
    console.log(port);
    console.log("Server has started.");
    
}

exports.start = start;
