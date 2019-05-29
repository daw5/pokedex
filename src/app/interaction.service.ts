import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _messageSource = new Subject();

  message$ = this._messageSource.asObservable();
  constructor() { }

  sendMessage(message: string) {
    this._messageSource.next(message);
  }
}
