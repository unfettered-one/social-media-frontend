import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';
  messageClass: string = '';

  constructor(private http: HttpClient) {}

  async login() {
    const body = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);

    try {
      const response = await firstValueFrom(
        this.http.post<{ success: boolean; access_token?: string; message: string }>(
          'http://127.0.0.1:8000/login',
          body.toString(),
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          }
        )
      );
      
      if (response.success && response.access_token) {
        localStorage.setItem('bearer_token', response.access_token); // Store token securely
        this.message = 'Login successful!';
        this.messageClass = 'success';
      } else {
        this.message = response.message || 'Invalid username or password';
        this.messageClass = 'error';
      }
    } catch (error: any) {
      this.message = 'An error occurred. Please try again later.';
      this.messageClass = 'error';
      console.error('Error:', error);
    }
  }
}  
