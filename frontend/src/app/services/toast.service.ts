import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

type MessageType = {type: 'error' | 'info' | 'success', title: string, message?: string}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  error$ = new Subject<MessageType | null>()

  handle(message: MessageType) {
    this.error$.next(message)
  }

  clear() {
    this.error$.next(null)
  }
  
}
