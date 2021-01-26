import { container} from 'tsyringe'
import mailConfig from '@config/mail'
import IMailTemplateProvider from './models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider'


//import mailProviders from './MailProvider'
const providers = {
   handlebars: HandlebarsMailTemplateProvider,
   
}

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars
)