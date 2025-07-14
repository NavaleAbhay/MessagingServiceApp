import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = { username: '', password: '' };
  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.user).subscribe(() => {
      alert('Registered. Please verify.');
      this.router.navigate(['/verify']);
    });
  }
}
