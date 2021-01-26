import AppError from '@shared/errors/AppError';


import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider:FakeHashProvider
let fakeCacheProvider:FakeCacheProvider
let createUser:  CreateUserService
let authenticateUser: AuthenticateUserService
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider ()
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider)
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
  })
    it('should be able to create a new User', async () => {
     
      
    const user =  await createUser.execute({
        name: 'John Doe',
        email: 'johndie@example.com',
        password: '123456'
      })
      
      expect(user).toHaveProperty('id');
      
    })

    it('should not be able to create a new User with same email from another', async () => {
      
      
    const user =  await createUser.execute({
        name: 'John Doe',
        email: 'johndie@example.com',
        password: '123456'
      })
      
     await expect(createUser.execute({
        name: 'John Doe',
        email: 'johndie@example.com',
        password: '123456'
      })).rejects.toBeInstanceOf(AppError)
      
    })

   

 
 
})