import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import messages from '../routes/messages.route';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const usersConnected = new UserList();

export const connectClient = (client: Socket) => {
    const user = new User(client.id);
    usersConnected.add(user);
}

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('CLIENTE DESCONECTADO')
        usersConnected.deleteUser(client.id);
    });
}

export const message = (client: Socket, io: socketIO.Server ) => {
    client.on('message', (payload: { de: string, cuerpo: string }) => {
        console.log('RECIBÍ MENSAJE', payload);
        io.emit('new-message', payload);
    })
}

export const configUser = (client: Socket, io: socketIO.Server) => {
    client.on('config-user', (payload: { name: string }, callback: any) => {
        console.log('Configurando usario en server', payload.name );
        // io.emit('new-message', payload);
        usersConnected.updatedName(client.id, payload.name);
        callback({
            ok: true, message: `Usuario ${payload.name}, configurado`
        });
    })
}

