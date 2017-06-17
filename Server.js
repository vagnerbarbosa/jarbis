var express = require("express");
var favicon = require('serve-favicon');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
        res.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
  next();
});

app.use('/assets',  express.static(__dirname + '/assets'));
app.use(favicon(__dirname + '/assets/img/favicon.ico'));

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/fornecedores",function(req,res){
  res.sendFile(path + "fornecedores.html");
});

router.get("/notas",function(req,res){
  res.sendFile(path + "notas.html");
});

router.get("/notas-superloja",function(req,res){
  res.sendFile(path + "notas-superloja.html");
});

app.use("",router);

app.use("/assets",function(req,res){
  res.sendStatus(404);
});

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
