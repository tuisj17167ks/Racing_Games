var express = require("express"),
  app = express(),
  http = require("http"),
  server = http.createServer(app),
  io = require("socket.io").listen(server);

app.use("/", express.static(__dirname + "/public")); //このディレクトリの奴を使用可的な
server.listen(8081);

io.sockets.on("connection", function (socket) {
  socket.on("start",function(){
    socket.emit("camon");
  });
  socket.on("data",function(info){
    socket.emit("data",info);
  });
});
