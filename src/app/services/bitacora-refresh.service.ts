import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitacoraRefreshService {

private _refrescaBitacoraSource = new Subject<number>();
refreshBitacora$ = this._refrescaBitacoraSource.asObservable();

  constructor() { }
  
  sendValor(valor: number) {
    this._refrescaBitacoraSource.next(valor);
  }
}
