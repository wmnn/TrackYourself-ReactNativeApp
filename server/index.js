var express = require('express')
var app = express()
const cors = require ("cors");
const path = require("path");
require('dotenv').config()


app.use(cors({ origin: "http://localhost:8000", credentials: true }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public/dist'))


app.get("/", function(req, res){
})

app.post("/", function(req,res){
    res.json({status:200})

})
app.put("/", function(req,res){

})
app.delete("/", function(req,res){

})


app.get('/', (req, res) => {
	return res.sendFile(path.join(__dirname, "./public/dist", "index.html"));
});

app.listen(process.env.PORT || 3000, function(){console.log("> Started at 3000")});