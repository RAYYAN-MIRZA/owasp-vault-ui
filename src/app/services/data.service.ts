import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private serIdSubject = new BehaviorSubject<number | null>(null);
  serId$ = this.serIdSubject.asObservable(); //
  constructor() { }

    setUserId(id: number) {
      this.serIdSubject.next(id);
    }
  
    getUserId(): number | null {
      return this.serIdSubject.getValue();
      }
}
