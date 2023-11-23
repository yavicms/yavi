const WebSocket = require("./library/ws");
const socketHandle = require("yavi/server/socket/handle");
const socketPlugin = require("yavi/socket/task/plugin");

module.exports = function WebSocketConnect(server) {

    const socket = new WebSocket(server);

    socketHandle(socket);

    socketPlugin(socket);

}