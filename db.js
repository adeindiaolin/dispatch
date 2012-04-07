var nano = require("nano");
var db_couch= nano('http://admin:adeindia1000@dispatch.iriscouch.com/');
var db = db_couch.use('dispatch');

// CREATE A NEW DOCUMENT IN THE db
//
// db is the nano's db object
// id is the new id of the the document
// item is the json of the document to be created

function insert_db(db, id, item) {
  db.insert(item, id, function(err){
    if(err) {throw err;}
    console.log('inserted' + item);
           });
}

// GET THE DOCUMENT WITH ID
//
// this is only a helper function to output the document
// DO NOT USE AS CALLBACK
function get_db(db, id) {
  db.get(id, function(err, val) {
    console.log(id + ' = ', val);
  });
}


//UPDATES THE DOCUMENT WITH ID = id
//
//set the document.key = val
//if key is not present in document, it's created.
function update_db(db, id, key, val){
  db.get(id, function(err, doc) {
    console.log('got doc of id ' + id);
    doc[key] = val;
    insert_db(db, id, doc)
  });
}

// DELETES DOCUMENT FROM DB
// peremanent removal of document with ID = id

function delete_db(db, id){
  db.get(id, function(err, val) {
    db.destroy(id,val._rev, function(err, val){
      if(err) {throw: err}
      console.log(id + ' Destroyed');
    });
  });
}


