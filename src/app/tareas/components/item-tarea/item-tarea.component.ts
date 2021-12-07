import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Tarea } from '../../../models/tarea';
import { MatDialog } from '@angular/material/dialog';
import { TareaDetailComponent } from '../tarea-detail/tarea-detail.component';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { Utils } from '../../../common/utils';



@Component({
  selector: 'app-item-tarea',
  templateUrl: './item-tarea.component.html',
  styleUrls: ['./item-tarea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemTareaComponent implements OnInit {
  @Input() item: Tarea = new Tarea();


  color1: string = "";
  color2: string = "";
  color3: string = "";
  iconoPrioridad: string = "";

  colorAtrasada: string = "text-white";
  colorFecha: string = "text-dark";



  constructor(public dialog: MatDialog, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('es-CO'); //dd/MM/yyyy
  }

  ngOnInit(): void {

    switch (this.item.prioridad) {

      case 2:
        this.iconoPrioridad = "./assets/img/" + "cdos.png";
        break;
      case 3:
        this.iconoPrioridad = "./assets/img/" + "ctres.png";
        break;
      case 4:
        this.iconoPrioridad = "./assets/img/" + "ccuatro.png";
        break;
      case 5:
        this.iconoPrioridad = "./assets/img/" + "ccinco.png";
        break;

      default:
        this.iconoPrioridad = "./assets/img/" + "cuno.png";
        break;
    }

    this.cambiaEstado(this.item.estado);
    let fechaActual = new Date();
    if (this.isDatesEqual(this.item.fechalimite, fechaActual)) {
      this.colorAtrasada = "text-danger"
      this.colorFecha = "text-danger"
    }


  }

  openDialog(item: Tarea): void {
    // console.log(item)

    const dialogRef = this.dialog.open(TareaDetailComponent, { data: { item: item } })
  }

  cambiaEstado(estado: number) {
    switch (estado) {

      case 1:
        this.color1 = "bg-danger";
        this.color2 = "bg-white";
        this.color3 = "bg-white";
        break;
      case 2:
        this.color1 = "bg-danger";
        this.color2 = "bg-secondary";
        this.color3 = "bg-white";
        break;
      case 3:
        this.color1 = "bg-danger";
        this.color2 = "bg-secondary";
        this.color3 = "bg-warning";
        break;
    }
  }


  isDatesEqual(date1: string, date2: Date) {

    let date3: Date = new Date(date1);

    // console.log(date3 + "-" + date2);
    return moment(date3).isBefore(date2);
  }

  ngOnDestroy() {
    this.dialog.closeAll;
  }


}
