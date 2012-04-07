var nano = require('nano')(' https://dispatch.iriscouch.com/');
nano.request({db: "_uuids"}, function(_,_,uuids){ console.log(uuids); });
