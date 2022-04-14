import express from "express";
import { createServer } from 'http';
import { Server as SocketServer } from "socket.io"
import ServerApplication from "./app";

const app = express();
const server = createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: "*"
    }
});

ServerApplication(app, io).then(_ => {})

const port = 5000

server.listen(port, () => console.log(`Running on port ${port}`))