import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() { }
  createDb() {
    return {
      Users: [
        {
          id: 1,
          firstName: 'Seaman',
          lastName: 'Sailor',
          email: 'ssailor@gmail.com',
          password: '123456',
          userType: 'admin'
        },
        {
          id: 2,
          firstName: 'Kenny',
          lastName: 'Nagelsmann',
          email: 'bootyscope@gmail.com',
          password: '47954',
          userType: 'user'
        },
        {
          id: 3,
          firstName: 'John',
          lastName: 'bignipples',
          email: 'Jbignipples@gmail.com',
          password: '16278',
          userType: 'user'
        }
      ]
    };
  }
}
