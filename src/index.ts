import express, { Request } from "express";
import cors from "cors";
import { createClient } from "redis";
import { createServer } from 'http';
import { Server } from "socket.io"
import SocketMain from "./utils/socketMain";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

type RequestWithIO = Request & {io: Server}

(async () => {
    const client = createClient();
    client.on("error", (err) => console.log("Redis Client Error", err))
    await client.connect();
    new SocketMain(io, client);

    app.use((req: RequestWithIO, res, next) => {
        req.io = io;
        next();
    });

    app.use(
        cors({
            origin: ['http://localhost:3000']
        }),
        express.json(),
        express.urlencoded({extended: false})
    );

    app.post('/signup', async (req: RequestWithIO, res) => {
        await client.set('newest_user', req.body.email)
        await client.rPush('users_list', req.body.email)
        req.io.emit("NEW_USER_SIGNUP", {
            ...req.body
        })
    })
})()

const port = 5000

server.listen(port, () => console.log(`Running on port ${port}`))