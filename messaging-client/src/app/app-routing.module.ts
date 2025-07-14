import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { LoginComponent } from './auth/login/login.component';
import { ChatComponent } from './chat/chat/chat.component';

//const routes: Routes = [];
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
