const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.get("/", (req, res) => {
    res.send("Hello server is started");
});

let onlineUsers = {};

io.on("connection", (socket) => {
    console.log(`user connected of the id: ${socket.id}`);
    socket.on("user-login", (data) => loginEventHandler(socket, data));

    socket.on("disconnect", () => {
        disconnectEventHandler(socket.id);
    });
});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Socket events
const disconnectEventHandler = (id) => {
    console.log(`user disconnected of the id: ${id}`);
    removeOnlineUser(id);
    broadcastDisconnectedUserDetails(id);
};

const removeOnlineUser = (id) => {
    if (onlineUsers[id]) {
        delete onlineUsers[id];
    }
    console.log(onlineUsers);
};

const broadcastDisconnectedUserDetails = (disconnectedUserSocketId) => {
    io.to("logged-users").emit("user-disconnected", disconnectedUserSocketId);
};

const loginEventHandler = (socket, data) => {
    socket.join("logged-users");

    onlineUsers[socket.id] = {
        username: data.username,
        coords: data.coords,
    };
    console.log(onlineUsers);

    io.to("logged-users").emit("online-users", convertOnlineUsersToArray());
};

const convertOnlineUsersToArray = () => {
    const onlineUsersArray = [];

    Object.entries(onlineUsers).forEach(([key, value]) => {
        onlineUsersArray.push({
            socketId: key,
            username: value.username,
            coords: value.coords,
        });
    });

    return onlineUsersArray;
};
