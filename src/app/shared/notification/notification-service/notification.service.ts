import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationData } from '../notification-model/notification-data.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notification$: Subject<NotificationData> = new Subject();

  get notifications() {
    return this.notification$.asObservable();
  }

  constructor() {}

  show(text: string, duration: number = 3000) {
    this.notification$.next({ text, duration });
  }
}
