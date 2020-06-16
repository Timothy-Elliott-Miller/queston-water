


var express = require('express');
var app = require('express')();
var http = require('http').Server(app);


app.use(express.json());




app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies
var port = process.env.PORT || 8080;

app.set("view engine", "ejs")
app.use(express.static("public"));


// app.get('/player', function(req,res){
//     // res.send('player');
//     res.render('player');
// })


app.get('/', function(req,res){
    res.render('screen')
    // res.render('entry');
})



http.listen(port, function(){
   console.log('listening on *:' + port);
});
