import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Jwt} from '../models/jwt';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationMockService {

  private loggedIn = false;

  constructor() {
  }

  login(email: string, password: string): Observable<Jwt> {
    this.loggedIn = true;
    return of({idToken:'asdfghjkl', expiresIn: 12345});
  }

  logout(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): Date {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 1);
    return expiration;
  }

  register(email: string, name: string, password: string): Observable<Jwt> {
    this.loggedIn = true;
    return of({idToken:'asdfghjkl', expiresIn: 12345});
  }

  getUser(): User {
    return {
      id: 'asdfghjkl',
      email: 'test@test.com',
      name: 'Test User',
    };
  }
}
