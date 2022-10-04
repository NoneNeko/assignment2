var express = require("express");
var app = express();
var path = require("path");
var dataService = require("./data-service");
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

app.get("/employees", (req,res) =>{
    dataService.getAllEmployees().then((data)=>{
        res.sendFile(__dirname + "/data/employees.json");
    }).catch((err) =>{
        res.send("{message: }", err);
    });
})

app.get("/departments", (req,res) =>{
    dataService.getDepartments().then((data) =>{
        res.sendFile(__dirname +"/data/department.json");
    }).catch((err)=>{
        res.send("{message: }",err);
    });
 
}) 

dataService.initialize().then(() =>{
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) =>{
    console.log(err);
})
