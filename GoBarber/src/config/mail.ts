interface IMailConfig{
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email:string,
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'dominio@rocketseat.com.br',
      name: 'dominio rocketseat'
    }
  }

} as IMailConfig