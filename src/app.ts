import { Express } from "express";
import { createClient } from "redis";
import { Server } from "socket.io";
import SocketMain from "./utils/socketMain";

const ServerApplication = async (app: Express, io: Server) => {
    const client = createClient();
    await client.connect();
    new SocketMain(io, client);
    client.on("error", (err) => console.log("Redis Client Error", err))
}

export default ServerApplication;