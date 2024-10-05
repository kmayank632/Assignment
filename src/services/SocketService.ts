import { io, Socket } from 'socket.io-client';

class SocketService {
    private socket: Socket | null = null;

    connect(): void {
        this.socket = io('http://192.168.1.7:3000');
        console.log('Connected to the socket server.');
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            console.log('Disconnected from the socket server.');
        }
    }

    sendMessage(message: string): void {
        if (this.socket) {
            this.socket.emit('clientMessage', message);
        }
    }

    onServerMessage(callback: (msg: string) => void): void {
        if (this.socket) {
            this.socket.on('serverMessage', (msg: string) => {
                callback(msg);
            });
        }
    }

    offServerMessage(): void {
        if (this.socket) {
            this.socket.off('serverMessage');
        }
    }
}

export default new SocketService();
