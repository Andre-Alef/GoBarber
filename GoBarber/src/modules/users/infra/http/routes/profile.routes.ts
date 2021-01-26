import {  Router } from 'express'
import multer from 'multer'
import {celebrate, Segments, Joi } from 'celebrate'
import uploadConfig from '@config/upload'

import ProfileController from '../controllers/ProfileController'
import UserAvatarController from '../controllers/UserAvatarController'


const profileRouter = Router();
const upload = multer(uploadConfig)
const profileController = new ProfileController()

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

profileRouter.use(ensureAuthenticated)
// Rota: receber a requisição, chamar outro arquivo, devolver uma resposta
profileRouter.get('/', profileController.show)

profileRouter.put(
    '/',
    celebrate({
      [Segments.BODY]:{
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password'))

      }
    }),
    profileController.update)

export default profileRouter