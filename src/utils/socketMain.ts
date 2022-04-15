import { Server, Socket } from "socket.io"
import { createClient } from "redis";

type ClientType = ReturnType<typeof createClient>;

class SocketMain {

    mainSocket: Server;

    constructor(mainSocket: Server, client: ClientType) {
        this.mainSocket = mainSocket;
        this.mainSocket.on("connection", socket => {
            this.onGetNewUser(socket, client)
            this.onGetUserList(socket, client)
            this.onUserSignUp(socket, client)
        })
    }

    onGetNewUser(socket: Socket, client: ClientType) {
        socket.on("GET_NEW_USER", async () => {
            const newest_user = await client.lRange("users_list", 0, 0);
            socket.emit("GIVE_NEW_USER", {
                newest_user
            })
        })
    }

    onGetUserList(socket: Socket, client: ClientType) {
        socket.on("GET_TOTAL_USERS", async () => {
            const user_list = await client.lRange("users_list", 0, -1);
            socket.emit("GIVE_TOTAL_USERS", {
                totalUsers: user_list.length
            })
        })
    }

    onUserSignUp(socket: Socket, client: ClientType) {
        socket.on("USER_SIGNUP", async (data) => {
            const { email } = data;
            await client.lPush("users_list", email);
            this.mainSocket.emit("NEW_USER_SIGNUP", {
                email
            })
        })
    }
}

export default SocketMain