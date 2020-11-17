import Server from "./src/server/server";
import bodyparser from 'body-parser';
import cors from 'cors';
import routes from './src/routes/router';

const server = Server.instance;

// BodyParser
server.app.use(bodyparser.urlencoded({ extended: true }))
server.app.use(bodyparser.json());

server.app.use(cors() );

// Rutas de servicios
server.app.use('/', routes);

server.start(() => {
    console.log(`Server Listening in port ${server.port}`)
});