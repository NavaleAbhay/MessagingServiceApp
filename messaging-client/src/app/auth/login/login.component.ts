import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = { username: '', password: '' };
  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.user).subscribe((res) => {
      console.log("res",res);
     // this.auth.saveToken(res.data.token);
     //node 
      this.auth.saveToken(res.data);
      this.router.navigate(['/chat']);
    });
  }
}
