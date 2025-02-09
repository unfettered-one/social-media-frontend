import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams, HttpHeaders ,HttpResponse} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router'; 


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

  constructor(private http: HttpClient,private router: Router) {}

  async login() {
    const body = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);

    try {
      const response = await firstValueFrom(
        this.http.post<HttpResponse<any>>(
          'http://127.0.0.1:8000/login',
          body.toString(),
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded'
            }),
            observe: 'response'
          }
          
        )
      );
      const responseBody = response.body as{access_token?: string,token_type?: string,expires_in?: number};
      if (response.status==200 ) {
        if (response.body!=null && responseBody.access_token!=null && responseBody.token_type!=null && responseBody.expires_in!=null) 
          
          {localStorage.setItem(responseBody.token_type, responseBody.access_token);} // Store token securely

        this.message = 'Login successful!';
        this.messageClass = 'success';
        this.router.navigate(['home']);
      } else {
        this.message =  'Invalid username or password';
        this.messageClass = 'error';
      }
    } catch (error: any) {
      this.message = 'An error occurred. Please try again later.';
      this.messageClass = 'error';
      console.error('Error:', error);
    }
  }
}  
