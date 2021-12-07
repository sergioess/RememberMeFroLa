import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-item-categorias',
  templateUrl: './item-categorias.component.html',
  styleUrls: ['./item-categorias.component.css']
})
export class ItemCategoriasComponent implements OnInit {
  @Input() item: Categoria = new Categoria();
  constructor() { }

  ngOnInit(): void {
  }

}
