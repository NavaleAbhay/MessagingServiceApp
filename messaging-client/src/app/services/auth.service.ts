import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private baseUrl = 'http://localhost:5279/api/auth';
  private baseUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  verify(username: string, otp: string) {
    return this.http.post(`${this.baseUrl}/verify`, { username, otp });
  }

  login(user: any) {
    return this.http.post<Response>(`${this.baseUrl}/login`, user);
  }

  saveToken(token: string) {
    debugger;
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
