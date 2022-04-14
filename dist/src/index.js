"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socketMain_1 = __importDefault(require("../utils/socketMain"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
app.use((req, res, next) => {
    req.io = io;
    next();
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, redis_1.createClient)();
    client.on("error", (err) => console.log("Redis Client Error", err));
    yield client.connect();
    yield client.set("key", "value");
    const value = yield client.get("foo");
    console.log("Value is: " + value);
    new socketMain_1.default(io);
}))();
const port = 5000;
app.get('/', (_, res) => {
    res.status(200).send("Ok");
});
server.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map