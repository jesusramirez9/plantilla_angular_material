import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmpresaAuth } from 'src/app/models/EmpresaAuth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentCompanySubject: BehaviorSubject<any>;
  public currentCompany: Observable<any>;
  
  constructor(private http: HttpClient) { 
    this.currentCompanySubject = new BehaviorSubject<EmpresaAuth>(JSON.parse(localStorage.getItem('currentCompany') || '{}'));
    this.currentCompany = this.currentCompanySubject.asObservable();
  }

  public get currentCompanyValue(): EmpresaAuth {
    return this.currentCompanySubject.value;
  }

  login(username: string, password: string) {
    console.log(username, password);
    return this.http.post<any>(`${environment.apiURL}/intranet/login`, { emailorphone: username, password: password })
      .pipe(map((user: any) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentCompany', JSON.stringify(user.data[0]));
        this.currentCompanySubject.next(user.data[0]);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentCompany');
    this.currentCompanySubject.next({});
  }

}
