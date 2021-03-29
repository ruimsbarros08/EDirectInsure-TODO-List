import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationMockService} from '../../services/authentication-mock.service';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="form">
      <div class="row">
        <div class="col-sm-12 offset-md-3 col-md-6">
          <form>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" placeholder="Enter email" formControlName="email">
            </div>
            <div class="form-group">
              <label for="pwd">Password</label>
              <input type="password" class="form-control" id="pwd" placeholder="Password" formControlName="password">
            </div>
            <button type="submit" class="btn btn-primary" (click)="login()" [disabled]="form.invalid">Login</button>
          </form>
        </div>
        <div class="offset-md-3 col-12">
          <button class="btn"><a routerLink="/register">Or register</a></button>
        </div>
      </div>
    </form>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private authService: AuthenticationMockService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const val = this.form.value;

    const sub = this.authService.login(val.email, val.password).pipe(
      tap(() => this.router.navigateByUrl('/')),
    ).subscribe();
    this.subscription.add(sub);
  }
}
