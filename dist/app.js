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
const redis_1 = require("redis");
const socketMain_1 = __importDefault(require("./utils/socketMain"));
const ServerApplication = (app, io) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, redis_1.createClient)();
    yield client.connect();
    new socketMain_1.default(io, client);
    client.on("error", (err) => console.log("Redis Client Error", err));
});
exports.default = ServerApplication;
//# sourceMappingURL=app.js.map