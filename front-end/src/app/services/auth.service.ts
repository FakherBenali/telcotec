import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = JSON.parse(atob(token.split('.')[1])).id;
      return this.http.get<any>(`${this.url}getById/${userId}`);
    }
    throw new Error('No token found');
  }  private url = 'http://127.0.0.1:3000/author/';

  constructor(private http: HttpClient) {}

  login(author: any): Observable<any> {
    return this.http.post(this.url + 'login', author);
  }
  
  register(email: string, password: string): Observable<any> {
    return this.http.post(this.url + 'register', { email, password });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getAuthorDataFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.url}getById/${id}`);
  }
}
