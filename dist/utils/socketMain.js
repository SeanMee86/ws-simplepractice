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
Object.defineProperty(exports, "__esModule", { value: true });
class SocketMain {
    constructor(mainSocket, client) {
        mainSocket.on("connection", socket => {
            this.onGetNewUser(socket, client);
            this.onGetUserList(socket, client);
        });
    }
    onGetNewUser(socket, client) {
        socket.on("GET_NEW_USER", () => __awaiter(this, void 0, void 0, function* () {
            const newest_user = yield client.get('newest_user');
            socket.emit("GIVE_NEW_USER", {
                newest_user
            });
        }));
    }
    onGetUserList(socket, client) {
        socket.on("GET_TOTAL_USERS", () => __awaiter(this, void 0, void 0, function* () {
            const user_list = yield client.lRange("users_list", 0, -1);
            socket.emit("GIVE_TOTAL_USERS", {
                totalUsers: user_list.length
            });
        }));
    }
}
exports.default = SocketMain;
//# sourceMappingURL=socketMain.js.map