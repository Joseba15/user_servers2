import { Injectable } from '@angular/core';
import { of, Observable, switchMap } from 'rxjs';
import { UsersService } from '../users/services/users.service';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { User } from '../servers/interfaces/client.interface';


@Injectable({
  providedIn: 'root' 
})

export class AuthService {

  constructor(private userService: UsersService,private http :HttpClient) { }
  loggedIn = false;



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  isAuthenticated() {
    //Recuperamos la clave authenticated de localStorage
    // const promise = new Promise(
    //   (resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(localStorage.getItem('authenticated')==='true');
    //     }, 800);
    //   }
    // );
    // return promise;
    return localStorage.getItem('authenticated')==='true'
  }
 
  login(email: string, password: string):Observable<boolean>{
    //Recuperamos el usuario y comprobamos que la contraseña sea correcta
  //  return this.userService.getUserByEmail(email)
  //   .pipe( switchMap((user=> {
  //     if (user.length && user[0].password===password){
  //       localStorage.setItem('authenticated', 'true');
  //       localStorage.setItem('rol', user[0].rol);
  //       return of(true)
  //       this.http.post<User>("http://localhost:8000/auth/login",{"email":email,"password":password},this.httpOptions);
  //     }
  //     else{
  //       localStorage.setItem('authenticated', 'false');
  //       return of(false)
  //     }
  //   })))
    

    return this.http.post<string>("http://localhost:8000/auth/login",{"email":email,"password":password},this.httpOptions)
    .pipe( switchMap((resp=> {
      
      if (resp){
        localStorage.setItem('authenticated', 'true');
        return of(true)
      }
      else{
        localStorage.setItem('authenticated', 'false');
        return of(false)
      }

    })))
    

    // .subscribe({
    //   next: (resp)=> {
    //     if (resp.email===email && resp.password===password){
    //       localStorage.setItem('authenticated', 'true');
    //       return 
    //     }
    //     else{
    //       localStorage.setItem('authenticaded', 'false');
    //       return of(false)
    //     }
    //   },
    //   error: (error) => {
    //     localStorage.setItem('authenticated', 'false');
    //     return of(false)
    //   }
    // })
    
    
  }
 


  logout() {
    //Cambiamos el valor de la clave authenticated a false en localStorage
    localStorage.setItem('authenticated', 'false');
    localStorage.removeItem('rol');
  }
}
