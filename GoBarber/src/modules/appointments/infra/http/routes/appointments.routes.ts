import {  Router } from 'express'
import {celebrate, Segments, Joi } from 'celebrate'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentsController from '../controllers/AppointmentsController';
import ProvidersController from '../controllers/ProvidersController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController()
const providersController = new ProvidersController()
appointmentsRouter.use(ensureAuthenticated)


// Rota: receber a requisição, chamar outro arquivo, devolver uma resposta
appointmentsRouter.post(
    '/',
    celebrate({
      [Segments.BODY]:{
        provider_id: Joi.string().uuid().required(),
        date: Joi.date(),
      }
    }),
    appointmentsController.create )
appointmentsRouter.get('/me', providersController.index)
export default appointmentsRouter