import express, { Express } from "express";
import cors from "cors";
import { createClient } from "redis";
import { Server } from "socket.io";
import SocketMain from "./utils/socketMain";
import { RequestWithIO } from "./lib";

const ServerApplication = async (app: Express, io: Server) => {
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
}

export default ServerApplication;