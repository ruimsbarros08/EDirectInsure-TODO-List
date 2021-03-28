import {Component} from '@angular/core';
import {AuthenticationMockService} from './services/authentication-mock.service';
import {Router} from '@angular/router';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  template: `
    <div class="navbar navbar-dark">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link active" href="/">EDirect Insure</a>
        </li>
      </ul>
      <ul class="nav justify-content-end" *ngIf="authenticationService.isLoggedIn()">
        <li class="nav-item">
          {{ authenticationService.getUser().name }}
        </li>
        <li class="nav-item">
          <button class="btn btn-sm btn-danger" (click)="logout()"><fa-icon [icon]="iconLogout"></fa-icon></button>
        </li>
      </ul>
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'EDirectInsure-TODO-List';
  iconLogout = faPowerOff;

  constructor(public authenticationService: AuthenticationMockService,
              private router: Router) {
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
