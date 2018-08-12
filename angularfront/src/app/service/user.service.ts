import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UserService {
 
  private usersUrl = 'http://localhost:3000/users';  // URL to web api
 
  constructor(private http: HttpClient) { }
 
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
 
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url);
  }
 
  addUser (user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/user_create', user, httpOptions)
  }
 
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url, httpOptions);
  }
 
  updateUser (user: User): Observable<any> {
    return this.http.put('http://localhost:3000/user_create', user, httpOptions)
  }
}