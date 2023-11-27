const App = require("./plugin");
const httpServer = require("./server/http/handle");

const WebSocket = require("yavi/socket");

// const Redis = require("yavi/db/redis");
const Mongoose = require('yavi/db/mongo');

Object.defineProperty(App, "project", {
    writable: false,
    value(dir) {
        App.setDir(dir);
        App.Load();

        const server = httpServer(App.$info.server);

        if (App.info.websocket) WebSocket(server);

        /**
         * 	Kết nối MongoDB
         **/
        if (App.$info.mongodb) Mongoose(App.$info.mongodb);

        /**
         * 	Kết nối Redis
         **/
        // if (App.$info.redis) Plugin.redis = new Redis(App.$info.redis);
    }
});

module.exports = App;