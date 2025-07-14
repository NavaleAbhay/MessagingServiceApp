import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  username = '';
  otp = '123456';
  constructor(private auth: AuthService, private router: Router) {}

  verify() {
    this.auth.verify(this.username, this.otp).subscribe(() => {
      alert('Verified. Login now.');
      this.router.navigate(['/login']);
    });
  }
}
