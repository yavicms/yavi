// Import thư viện ws
const WS = require("ws");
const { loop } = require("yavi/lib");

module.exports = class WebSocket {
    #$events = {};
    #$ws = null;
    #$wss = null;
    request = {};

    constructor(server) {

        this.#$wss = new WS.Server({ server });

        this.#$wss.on("connection", (ws, request) => {

            this.request = request;

            this.#$ws = ws;

            ws.on("close", message => this.#close(message));
            ws.on("message", message => this.#message(message));
        });
    }

    on(event_name, calback) {
        if (!this.#$events[event_name]) this.#$events[event_name] = [];
        this.#$events[event_name].push(calback);
    }

    /**
     * Gửi dữ liệu Socket dến Client
     * @param name - event name - String
     * @param data - event data - Object
     * @param isfn - is function - Number {0,1}
     */
    emit(name, data, isfn) {
        let wss = isfn ? [this.#$ws] : this.#$wss.clients;
        let socket_json = JSON.stringify([name, data, isfn]);

        Promise.all(wss.map((ws) => ws.send(socket_json)));
    }

    /**
     * Nhận dữ liệu Socket từ Client
     * @param {*} message - Array - [event_name, object_data, isFunction]
     * @returns 
     */
    #message(message) {
        if (typeof message !== "object") return;

        message = JSON.parse(message);

        Promise.all((this.#$events[message[0]] || []).map((fn) =>
            typeof fn === "function" && fn(message[1], message[2])));
    }

    #close(message) { }

    /**
     * join room
     */
    static #$rooms = {};
    /**
     * Thêm vào phòng
     * @param {*} roomid : ID của room
     * @param {*} socket : client muốn thêm
     */
    static join(roomid, socket) {
        if (!this.#$rooms[roomid]) this.#$rooms[roomid] = [];
        this.#$rooms[roomid].push(socket);
    }
    join(roomid) {
        WebSocket.join(roomid, socket);
    }
    /**
     * Rời khỏi phòng
     * @param {*} roomid : ID của room
     * @param {*} socket : client muốn xóa
     */
    static leave(roomid, socket) {
        Promise.all((this.#$rooms[roomid] || []).map((ws) =>
            socket === ws ? Promise.reject() : undefined));
    }
    leave(roomid) {
        WebSocket.leave(roomid, this);
    }
    /**
     * Gửi tin nhắn đến 1 phòng nào đó
     * @param {*} roomid 
     * @param {String} emit_name 
     * @param {Object} emit_data 
     * @returns 
     */
    static to(roomid, emit_name, emit_data) {
        let clients = this.#$rooms[roomid], socket_json;

        if (!clients) return;

        socket_json = JSON.stringify([emit_name, emit_data]);

        Promise.all(clients.map(ws => ws.send(socket_json)));
    }
    to(roomid, emit_name, emit_data) {
        WebSocket.to(roomid, emit_name, emit_data);
    }
};