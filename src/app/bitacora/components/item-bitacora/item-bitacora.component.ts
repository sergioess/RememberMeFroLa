import { Component, Input, OnInit } from '@angular/core';
import { Bitacora } from '../../../models/bitacora';

@Component({
  selector: 'app-item-bitacora',
  templateUrl: './item-bitacora.component.html',
  styleUrls: ['./item-bitacora.component.css']
})
export class ItemBitacoraComponent implements OnInit {
  @Input() item: Bitacora = new Bitacora();

  constructor() { }

  ngOnInit(): void {
  }

}
