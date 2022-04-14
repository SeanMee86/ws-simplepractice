import { Server, Socket } from "socket.io"
import {createClient} from "redis";

type ClientType = ReturnType<typeof createClient>;

class SocketMain {
    constructor(mainSocket: Server, client: ClientType) {
        mainSocket.on("connection", socket => {
            this.onGetNewUser(socket, client)
            this.onGetUserList(socket, client)
        })
    }

    onGetNewUser(socket: Socket, client: ClientType) {
        socket.on("GET_NEW_USER", async () => {
            const newest_user = await client.get('newest_user');
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

}

export default SocketMain