var nano = require('nano')('https://dispatch.iriscouch.com/');
var request = require('request');

var db_name = "dispatch";
var db = nano.use(db_name);

// {} for empty body as parameter is required but will be piped in
request.get("http://nodejs.org/logo.png").pipe(
  db.attachment.insert("new", "logo.png", {}, "image/png")
);
