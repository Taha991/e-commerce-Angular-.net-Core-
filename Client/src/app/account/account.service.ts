import { Injectable  , OnInit} from '@angular/core';
import { User } from '../shared/models/user';
import { BehaviorSubject, ReplaySubject, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {
  baseUrl = 'https://localhost:7275/api/';

  private currentUserSource = new ReplaySubject<User|null>(1);
  currentUser$= this.currentUserSource.asObservable();


  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
  }


  loadCurrentUser(token:string|null)
  {
    if(token == null)
    {
      this.currentUserSource.next(null);
      return of(null);
    }
  let headers = new HttpHeaders();
  headers = headers.set('Authorization' , `Bearer ${token}`);

  return this.http.get<User>(this.baseUrl+'account' ,{headers}).pipe(
    map(user =>{
      if(user)
      {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        return user;
      }
      else
      {
        return null;
      }

    })
  )
  }


  register(value:any)
  {
    return this.http.post<User>(this.baseUrl+'account/register',value).pipe(
      map(user => {
        localStorage.setItem('token' , user.token);
        this.currentUserSource.next(user);

      })
    )
  }

  login(value:any)
  {
    return this.http.post<User>(this.baseUrl+'account/login',value).pipe(
      map(user => {
        localStorage.setItem('token' , user.token);
        this.currentUserSource.next(user);

      })
    )
  }

  logout()
  {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email:string)
  {
    return this.http.get<boolean>(this.baseUrl+'account/emailExists?email='+email);
  }

}
