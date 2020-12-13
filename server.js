var express = require("express"),
  app = express(),
  http = require("http"),
  server = http.createServer(app),
  io = require("socket.io").listen(server);

app.use("/", express.static(__dirname + "/public")); //このディレクトリの奴を使用可的な
server.listen(8081);

let map = [];
let chara_data = [];
let menber = 0;
let ParticipationNamber = null;
let date1 = new Date();

const fs = require('fs');
const csv = require('csv');
fs.createReadStream(__dirname + '/mapdata.csv')
  .pipe(csv.parse(function(err, data) {
    map = data;
}));
io.sockets.on("connection", function (socket) {
  socket.on("start",function(){
    socket.emit("map",map);
  });
  socket.on("Login",function(){
    menber++;
    if(ParticipationNamber != null){
      if(menber >= ParticipationNamber){
        console.log("ys");
        socket.emit("Start command",map);
      }
    }
  });
  socket.on("ParticipationNamber",function(No){
    ParticipationNamber = No;
    console.log(ParticipationNamber);
    io.sockets.emit("Yuser Nom",No);
  });

  socket.on("waiting",function(){
    socket.emit("map",map);
  });

  socket.on("data",function(info){
    socket.emit("data",info);
  });
  setInterval(function(){
    date1 = new Date();
    socket.emit("PingCheck",date1.getMilliseconds());
  },1000);
});
