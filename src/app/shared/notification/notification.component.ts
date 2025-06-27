
import { Component } from '@angular/core';
import { debounceTime, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationService } from '../../core/services/notification.service';
import { INotification } from '../../core/models/notification.interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  standalone: true
})
export class NotificationComponent {
  
  notification: INotification | undefined;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notification$.pipe(
      takeUntilDestroyed(),
      tap((notification) => (this.notification = notification)),
      debounceTime(3500),
    )
    .subscribe(() => this.notification = undefined);
  }
}