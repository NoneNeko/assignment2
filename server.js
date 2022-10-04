var express = require("express");
var app = express();
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
    dataService.getDepartments().then((data1) =>{
        const department = data1;
        let resText1 = "<br>";
        resText1 = JSON.stringify(department) + "<br>";
        res.send(resText1);
    }).catch((err)=>{
        res.send("{message: }",err);
    });
 
}) 

app.get("/managers", (req,res) =>{
    dataService.getManagers().then((data2) =>{
        const manager = data2;
        let resText2 = "<br>";
        resText2 = JSON.stringify(manager) + "<br>";
        res.send(resText2);
    }).catch((err) =>{
        res.send("{message: }", err);
    });
})

dataService.initialize().then(() =>{
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) =>{
    console.log(err);
})
