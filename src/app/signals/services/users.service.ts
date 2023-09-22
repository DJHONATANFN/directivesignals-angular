import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);
  private baseurl= 'https://reqres.in/api/users';

  constructor() { }

  getUserById(id:number):Observable<User>{
    return this.http.get<SingleUserResponse>(`${this.baseurl}/${id}`)
    .pipe(
      map( response=> response.data)
    )
  }
}
