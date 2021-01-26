import IHashProvider from '../models/IHashProvider'

class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload

  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    //console.log('payload: ' + payload)
    //console.log('hashed: ' + hashed)
    
    return payload == hashed

  }
}

export default FakeHashProvider