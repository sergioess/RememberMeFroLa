import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Tarea } from '../../../models/tarea';
import { MatDialog } from '@angular/material/dialog';
import { TareaDetailComponent } from '../tarea-detail/tarea-detail.component';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { Utils } from '../../../common/utils';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SubTarea } from '../../../models/sub-tarea';
import { SubtareaService } from '../../../services/subtarea.service';



@Component({
  selector: 'app-item-tarea',
  templateUrl: './item-tarea.component.html',
  styleUrls: ['./item-tarea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemTareaComponent implements OnInit {
  @Input() item: Tarea = new Tarea();

  listaSubTareas: SubTarea[] = [];

  color1: string = "";
  color2: string = "";
  color3: string = "";
  iconoPrioridad: string = "";

  colorAtrasada: string = "text-white";
  colorFecha: string = "text-dark";

  // Datos en la ventana modal
  modalRef?: BsModalRef;
  tituloSubtarea: string = "";

  constructor(public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    private modalService: BsModalService,
    private subTareaService: SubtareaService) {
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
        this.color1 = "#65CCB8";
        this.color2 = "#FFFFFF";
        this.color3 = "#FFFFFF";
        break;
      case 2:
        this.color1 = "#65CCB8";
        this.color2 = "#57BA98";
        this.color3 = "#FFFFFF";
        break;
      case 3:
        this.color1 = "#65CCB8";
        this.color2 = "#57BA98";
        this.color3 = "#3B945E";
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

  openModal(template: TemplateRef<any>) {

    this.subTareaService.getSubTareasTarea(this.item.id).subscribe(subtareas => {
      this.listaSubTareas = subtareas;

      // const lista = JSON.stringify(subtareas);
      // console.log(lista);
      this.modalRef = this.modalService.show(template, {
        class: 'modal-dialog-centered'
      });
    });




  }

  cambioEstado(id_subtarea: number) {
    console.log("cambio estado", id_subtarea);
    this.subTareaService.setSubTareaEstado(id_subtarea).subscribe(subtareas => {
      // const lista = JSON.stringify(subtareas);
      // console.log(lista);
    });

  }


  agregaSubTarea(id_subtarea: number) {
    let nuevaSubTarea = new SubTarea();
    nuevaSubTarea.titulo = this.tituloSubtarea;
    nuevaSubTarea.id_tarea = id_subtarea;

    this.subTareaService.createSubTarea(nuevaSubTarea).subscribe(subtareas => {
      // const lista = JSON.stringify(subtareas);
      // console.log(lista);
      this.listaSubTareas.push(subtareas);
    });
    this.tituloSubtarea = "";

  }

  deleteSubTarea(id_subtarea: number) {
    this.subTareaService.deleteSubTarea(id_subtarea).subscribe(subtareas => {
      // const lista = JSON.stringify(subtareas);
      // console.log(lista);
      this.subTareaService.getSubTareasTarea(this.item.id).subscribe(subtareas => {
        this.listaSubTareas = subtareas;
      });
    });
  }

}
