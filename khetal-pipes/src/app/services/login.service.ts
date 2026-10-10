import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // =====================================================
  // BACKEND API URL
  // Keep empty for now.
  //
  // Later simply paste your backend URL:
  // http://localhost:3000/api
  // =====================================================
  private readonly api = '';

  private readonly loginUrl = `${this.api}/auth/login`;

  constructor(
    private http: HttpClient
  ) {}

  login(data: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      this.loginUrl,
      data
    );

  }
}