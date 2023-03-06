import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

type MessageType = { type: 'error' | 'info' | 'success', title: string, message?: string }

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  message$ = new BehaviorSubject<MessageType | null>(null)

  handle(message: MessageType) {
    this.message$.next(message)
  }

  clear() {
    this.message$.next(null)
  }
  
}
