import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  error(msg: any) { console.error(msg); }
  info(msg: any) { console.info(msg); }
}
