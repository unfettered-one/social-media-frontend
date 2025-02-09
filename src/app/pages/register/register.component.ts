import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fullname: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  message: string = '';
  messageClass: string = '';

  private apiUrl = 'http://127.0.0.1:8000/users/'; // FastAPI backend endpoint

  constructor(private http: HttpClient, private router: Router) {}

  async register() {

    const usernameInt = Number(this.username);
  if (isNaN(usernameInt)) {
    this.message = 'Invalid username: must be an integer.';
    this.messageClass = 'error';
    return; // Stop execution if invalid
  }

  const body = {
    Id: usernameInt, // Ensure it's an integer
    name: this.fullname,
    email: this.email,
    password: this.password
  };

    try {
      const response = await firstValueFrom(
        this.http.post<HttpResponse<any>>(
          this.apiUrl,
          body,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            observe: 'response'
          }
        )
      );

      if (response.status === 200 && response.body) {
        this.message = 'Registration successful!';
        this.messageClass = 'success';
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1000); // Redirect to login page
      } else {
        this.message = 'Registration failed. Please try again.';
        this.messageClass = 'error';
      }
    } catch (error: any) {
      this.message = 'An error occurred. Please try again later.';
      this.messageClass = 'error';
      console.error('Error:', error);
    }
  }
}
