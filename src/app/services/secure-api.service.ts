import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecureApiService {
                    // Local for testing 
  private apiUrl = 'http://localhost:3000/secure/';
  private userIdSubject = new BehaviorSubject<number | null>(null);
  userId$ = this.userIdSubject.asObservable(); 
  constructor(private httpService: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.httpService.post(
      this.apiUrl + 'login',
      { username, password },
      { 
       withCredentials: true  
      }
    );
  }

  getComments(): Observable<any> {
    return this.httpService.get(this.apiUrl + 'comments', {    
      withCredentials: true 
    });
  }

  saveComments(comment: string): Observable<any> {
    return this.httpService.post(
      this.apiUrl + 'comments',
      { text: comment },
      { 
        withCredentials: true  
      }
    );
  }
  setUserId(id: number) {
    this.userIdSubject.next(id);
  }

  getUserId(): number | null {
    return this.userIdSubject.getValue();
  }
}
