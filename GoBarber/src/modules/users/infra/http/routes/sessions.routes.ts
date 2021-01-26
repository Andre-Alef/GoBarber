import {  Router } from 'express'
import {celebrate, Segments, Joi } from 'celebrate'
const sessionsRouter = Router();

import SessionsController from '../controllers/SessionsController'

const sessionsController = new SessionsController()

// Rota: receber a requisição, chamar outro arquivo, devolver uma resposta
sessionsRouter.post(
    '/',
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    }),
    sessionsController.create)

export default sessionsRouter