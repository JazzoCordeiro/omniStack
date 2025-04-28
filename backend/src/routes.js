import express from 'express';
import ongController from '../src/controllers/ongController.js';
import incidentController from '../src/controllers/incidentController.js';
import profileController from '../src/controllers/profileController.js';
import sessionController from '../src/controllers/sessionController.js';



const routes = express.Router();

//rota de login
routes.post('/session', sessionController.login);


//rota de listagem de ongs
routes.get('/ong', ongController.index);

//rota de adição de ongs.
routes.post('/ong', ongController.create);


//rota de adição de eventos
routes.post('/incidents', incidentController.create);

//rota de listagem de eventos
routes.get('/incidents', incidentController.index);

//rota para apagar um evento
routes.delete('/incidents/:id', incidentController.delete);


//rota para encontrar eventos de 1 único organizador
routes.get('/profile', profileController.index);


export default routes;
