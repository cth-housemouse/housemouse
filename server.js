var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

app.listen(3333)
console.log("server is listening on port 3333")
