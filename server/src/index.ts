import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';

import { Message } from "./model";

import * as serialPort from 'serialport';

class Server {
    public static readonly PORT = 8080;
    public app: any;
    public sPort: any;
    private server: any;
    private io: any;
    private port: number;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = http.createServer(this.app);
    }

    private config(): void {
        this.port = Server.PORT;

        this.sPort = new serialPort('COM3', {
            parser: serialPort.parsers.readline('\n')
        });

        this.sPort.on('open', () => {
            console.log('Port Opened');
        });

        this.sPort.write('main screen turn on', (err) => {
            if (err) { return console.log('Error: ', err.message) }
            console.log('message written');
        });
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            this.sPort.on('data', (data) => {
                /* get a buffer of data from the serial port */
                let res = data.toString().slice(-5).trim();
                this.io.emit('distance', res);
                console.log(res);
            });
            console.log('Connected client on port %s.', this.port);

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}

let server = Server.bootstrap();
export = server.app;