import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  email: string = '';
  password: string = '';
  isLoggedIn!: boolean;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
   this.authService.isAuthenticated()
   .subscribe({
    next :(resp) =>{
    if (resp) {
      this.isLoggedIn=true;
    }else{
      this.isLoggedIn=false;
    }
  }
  })
  }

  signIn():void{
      console.log('Email: ', this.email, 'Password: ', this.password)
      this.authService.login(this.email,this.password)
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.isLoggedIn=true;
            this.router.navigate(['/servers']);
          }
          else {
            this.email=''; 
            this.password='';
            confirm('Email o contraseña incorrectos');
          }
        }
      })
      
    }
    
  logOut():void{
    this.authService.logout();
    this.isLoggedIn=false;
  }
    
  
}
