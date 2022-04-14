import { Request } from "express";
import { Server as SocketServer } from "socket.io";

export type RequestWithIO = Request & { io: SocketServer }
