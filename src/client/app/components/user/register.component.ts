import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthenticationMockService} from '../../services/authentication-mock.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-register',
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
              <label for="email">Name</label>
              <input type="text" class="form-control" id="name" formControlName="name">
            </div>
            <div class="form-group">
              <label for="pwd">Password</label>
              <input type="password" class="form-control" id="pwd" placeholder="Password" formControlName="password">
            </div>
            <button type="submit" class="btn btn-primary" (click)="register()" [disabled]="form.invalid">Register</button>
          </form>
        </div>
        <div class="offset-md-3 col-12">
          <button class="btn"><a routerLink="/login">Or login</a></button>
        </div>
      </div>
    </form>
  `,
  styles: [],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  private subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private authService: AuthenticationMockService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(): void {
    const val = this.form.value;

    const sub = this.authService.register(val.email, val.name, val.password).pipe(
      tap(() => this.router.navigateByUrl('/')),
    ).subscribe();
    this.subscription.add(sub);
  }
}
