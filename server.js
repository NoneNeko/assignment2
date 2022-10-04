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
        const employee = data;
        let resText = "<br>";
        resText = JSON.stringify(employee) + "<br>";
        res.send(resText);
    }).catch((err) =>{
        res.send("{message: }", err);
    });
})

app.get("/departments", (req,res) =>{
    dataService.getDepartments().then((data) =>{
        res.json();
        const manager = data;
        let resText = "<br>";
        resText = JSON.stringify(manager) + "<br>";
        res.send(resText);
    }).catch((err)=>{
        res.send("{message: }",err);
    });
 
}) 

app.get("/managers", (req,res) =>{
    dataService.getManagers().then((data) =>{
        const department = data;
        let resText = "<br>";
        resText = JSON.stringify(department) + "<br>";
        res.send(resText);
    }).catch((err) =>{
        res.json();
        res.send("{message: }", err);
    });
})

dataService.initialize().then(() =>{
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) =>{
    console.log(err);
})
