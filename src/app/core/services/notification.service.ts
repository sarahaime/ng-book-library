import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { INotification } from '../models/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<INotification>();
  notification$ = this.notificationSubject.asObservable();

  show(message: string, type: 'success' | 'error' = 'success') {
    this.notificationSubject.next({ message, type }); 
  }
}