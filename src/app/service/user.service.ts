import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();
  constructor() { }
  getUsers() {
    return this.usersSubject.value;
  }
  addUser(user: any) {
    const updatedUsers = [...this.usersSubject.value, user];
    this.usersSubject.next(updatedUsers);
  }
}
