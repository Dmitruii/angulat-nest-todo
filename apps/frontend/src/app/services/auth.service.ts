import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { SignInDto, SignUpDto } from '../dto/auth.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(dto: SignUpDto): Observable<{token: string}>  {
    return this.http.post<{token: string}>(environment.baseApiUrl + '/signup', dto)
  }

  signin(dto: SignInDto): Observable<{token: string}>  {
    return this.http.post<{token: string}>(environment.baseApiUrl + '/signin', dto)
  }

  logout(): Observable<any>  {
    localStorage.removeItem('authToken')
    return this.http.delete(environment.baseApiUrl + '/logout')
  }

}
