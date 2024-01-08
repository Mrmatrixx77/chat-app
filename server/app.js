import express from 'express';
import { createServer } from 'node:http';
import { Server } from "socket.io";
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';



const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const __dirname = dirname(fileURLToPath(import.meta.url)); 
app.use(express.static('server'));


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


io.on('connection' , (Socket) => {
    // console.log("connection");
    Socket.on("send-name",(myname)=>{
      io.emit("send-name",myname);
    });
    Socket.on("message",(message)=>{
      io.emit("message",message);
    });
})


httpServer.listen(8000,() =>{
    // console.log(`app is running on port 8000`)
});

 export default app; 
// module.exports = app;