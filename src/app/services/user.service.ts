import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserRegistration {
  name: string;
  email: string;
  password: string;
  ubication: object;
  role: string;
  img?: File;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/signUp'; // Cambia esto según tu API

  constructor(private http: HttpClient) {}

  registerUser(user: UserRegistration): Observable<any> {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('ubication', JSON.stringify(user.ubication));
    formData.append('role', user.role);

    if (user.img) {
      formData.append('file', user.img);
    }

    return this.http.post(this.apiUrl, formData);
  }
}
