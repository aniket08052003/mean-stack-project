import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}

export interface RegisterResponse {
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // =====================================================
  // BACKEND API URL
  // Keep empty for now.
  //
  // Later simply paste:
  // http://localhost:3000/api
  // =====================================================
  private readonly api = '';

  private readonly registerUrl = `${this.api}/auth/register`;

  constructor(
    private http: HttpClient
  ) {}

  register(data: RegisterRequest): Observable<RegisterResponse> {

    return this.http.post<RegisterResponse>(
      this.registerUrl,
      data
    );

  }
}