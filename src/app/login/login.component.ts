import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User;
  public warning: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(fData: NgForm): void {
    this.auth.login(this.user).subscribe(
      (success) => {
        // store the returned token in local storage as 'access_token'
        localStorage.setItem('access_token', success.token);
        // redirect to the "contactus" route
        this.router.navigate(['/contactus']);
      },
      (err) => {
        this.warning = err.error.message;
      }
    );
  }
}
