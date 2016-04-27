
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('personlist',['personlist']);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/personlist',function(req,res){
console.log("i received a Get request")
 db.personlist.find(function(err,docs){
  console.log(docs);// console make sure we receive the data from db
  res.json(docs); // json send the data back to coroller
  });
 });

app.post('/personlist',function(req,res){ // listen for post 
  console.log(req.body); // req the data from body, serverdoesnt know how to oarse bodyy., intall body parser from gitbah server to teach server 
  db.personlist.insert(req.body,function(err,doc){ // doc is data we send
    res.json(doc); // inseert or send back to croller
  });
 });

app.delete('/personlist/:id',function(req,res){ // personlist/id for deleting specific id
  var id = req.params.id;
  console.log(id);
  db.personlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
    res.json(doc);
  });
});

app.get('/personlist/:id',function(req,res){
  var id  = req.params.id;
  console.log(id);
  db.personlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
    res.json(doc);
  });
});

app.put('/personlist/:id',function(req,res){
  var id = req.params.id;
  console.log(req.body.name);
  db.personlist.findAndModify(
    {
    query:{_id:mongojs.ObjectId(id)},
    update:{$set:{name: req.body.name, email:req.body.email, phone:req.body.phone}},
    new:true},function(err,doc){
      res.json(doc);
  });
  
});
app.listen(3000);
console.log("server running on port 3000");
