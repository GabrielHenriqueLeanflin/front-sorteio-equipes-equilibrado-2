import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router) ;
  private matSnackBar = inject(MatSnackBar);


  constructor() { }

  createUser(variables: {name:string, email:string, password:string, confirm_password:string} ):Observable<any> {
    return this.http.post(`${environment.api}/api/cadastro`, variables);
  }

  login(variables: {email:string, password:string} ):Observable<any> {
    return this.http.post(`${environment.api}/api/login`, variables);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.matSnackBar.open('Deslogado!', 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
