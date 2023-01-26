import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/servers/interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private http: HttpClient) { }

  token= localStorage.getItem('token');

  getUsers():Observable<User[]>{
    const  httpOptions = {
      headers : new HttpHeaders({ 'Autentification': `Bearer ${this.token}`})  
    }

    return this.http.get<User[]>('http://localhost:3000/users')
  }

  getUser(id:number):Observable<User>{
    const  httpOptions = {
      headers : new HttpHeaders({ 'Autentification': `Bearer ${this.token}`})  
    }
    return this.http.get<User>(`http://localhost:3000/users/${id}`)
  }

  getUserByEmail(email:string):Observable<User[]>{
    const  httpOptions = {
      headers : new HttpHeaders({ 'Autentification': `Bearer ${this.token}`})  
    }
    return this.http.get<User[]>(`http://localhost:3000/users/?email=${email}`)
  }

 



}
