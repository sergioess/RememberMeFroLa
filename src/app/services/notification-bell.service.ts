import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationBellService {

  private _countUnreadNotiSource = new Subject<number>();

  countUnreadNoti$ = this._countUnreadNotiSource.asObservable();


  constructor() { }

  sendValor(valor: number) {
    this._countUnreadNotiSource.next(valor);
  }


}
