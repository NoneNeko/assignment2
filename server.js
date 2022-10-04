var express = require("express");
var app = express();
var path = require("path");
app.use(express.static('public'));

var HTTP_PORT = process.env.Port || 8080;

function onHttpStart(){
    console.log("Express http server listening on: "+ HTTP_PORT);
}

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/home.html");
});

app.get("/about", (req,res) =>{
    res.sendFile(__dirname +"/views/about.html");
}) 