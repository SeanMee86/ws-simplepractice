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
const cors_1 = __importDefault(require("cors"));
const redis_1 = require("redis");
const socketMain_1 = __importDefault(require("./utils/socketMain"));
const ServerApplication = (app, io) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, redis_1.createClient)();
    client.on("error", (err) => console.log("Redis Client Error", err));
    yield client.connect();
    new socketMain_1.default(io, client);
    app.use((req, res, next) => {
        req.io = io;
        next();
    });
    app.use((0, cors_1.default)({
        origin: ['http://localhost:3000']
    }), express_1.default.json(), express_1.default.urlencoded({ extended: false }));
    app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.set('newest_user', req.body.email);
        yield client.rPush('users_list', req.body.email);
        req.io.emit("NEW_USER_SIGNUP", Object.assign({}, req.body));
    }));
});
exports.default = ServerApplication;
//# sourceMappingURL=app.js.map