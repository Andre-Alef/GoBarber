import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository:FakeUsersRepository
let fakeHashProvider:FakeHashProvider

let authenticateUser:AuthenticateUserService

describe('AuthenticateUser', () => {
 
  beforeEach(() => {
     fakeUsersRepository = new FakeUsersRepository()
     fakeHashProvider = new FakeHashProvider()
     
     authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to Authenticate', async () => {
        
      
       await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndie@example.com',
        password: '123456'
      })
        const response =  await authenticateUser.execute({
          email: 'johndie@example.com',
          password: '123456'
        })
          
      // console.log('dentro do teste ' +response)
      expect(response).toHaveProperty('token');
      
    })

   it('should not be able to authenticate with non existing user', async () => { 
      
     await expect(authenticateUser.execute({
        email: 'johndie@example.com',
        password: '123456'
      })).rejects.toBeInstanceOf(AppError)
      
    })
 
    it('should not be able to Authenticate with wrong password', async () => {
         
       await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndie@example.com',
        password: '123456'
      })

         
     await expect(authenticateUser.execute({
        email: 'johndie@example.com',
        password: 'wrong-password'
      })).rejects.toBeInstanceOf(AppError);
      
    })
    
})