const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middlewre
app.use(express.json());

var clients = {};

io.on("connection",(socket)=>{
    console.log("connected");
    console.log(socket.id, "has joined");
    socket.on("signin",(id)=>{
        console.log(id);
        clients[id] = socket;
        console.log(clients);
    });
    //send Message to Server with senderid and receiverid and send message from server to receiver
    socket.on("message",(msg)=>{
        console.log(msg);
        let targetId=msg.targetId;
        if(clients[targetId]) clients[targetId].emit("message", msg);
    });
});

app.route("/check").get((req,res)=>{
    return res.json("Your app is working fine");
});

server.listen(port,"0.0.0.0",()=>{  //"0.0.0.0" launch the server on the local IP address of the computer
    console.log("Server started");
});
