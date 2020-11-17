import express from 'express';
import path from 'path';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    start(callback: () => void) {
        this.httpServer.listen(this.port, callback);
        this.initPublicFolder();
        this.listenSockets();
    }

    private listenSockets() {
        console.log('LISTENING SOCKETS');
        this.io.on('connection', client => {
            // console.log('new client connected');
            // console.log(client.id);

            socket.connectClient(client);
            
            //Configurar usuario
            socket.configUser(client, this.io);

            socket.message(client, this.io);

            // Desconectar
            socket.disconnect(client);
        });;
    }

    initPublicFolder() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }
}