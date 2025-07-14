import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { WebsocketService } from '../services/websocket.service';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class AuthModule { }
