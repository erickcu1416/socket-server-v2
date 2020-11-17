import { Router, Request, Response } from 'express';
import Server from '../server/server';
const messages = Router();

messages.get('/messages', (req: Request, res: Response) => {
    res.json({ ok: true, messages: 'todo está bien'});
});

messages.post('/messages', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;


    const server = Server.instance;
    server.io.emit('new-message', { cuerpo, de });

    res.json({ ok: true, cuerpo, de });
});

messages.post('/messages/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo,

    }

    const server = Server.instance;
    server.io.in(id).emit('private-message', payload);

    res.json({ ok: true, cuerpo, de, id });
});

export default messages;