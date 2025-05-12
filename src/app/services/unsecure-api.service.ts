import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsecureApiService {
                  // Local for testing 
  private apiUrl='http://localhost:3000/unsecure/';
  constructor(private httpService:HttpClient) { }
  
  login(username: string, password: string): Observable<any> {
    return this.httpService.post(this.apiUrl+'login', { username, password });
  }
  getComments(): Observable<any> {
    return this.httpService.get(this.apiUrl+'comments');
  }
  saveComments(comment:string): Observable<any> {
  return this.httpService.post(this.apiUrl+'comments', { text: comment });
  }

}
