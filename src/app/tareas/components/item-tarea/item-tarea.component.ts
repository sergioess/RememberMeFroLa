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
import { ToastrService } from 'ngx-toastr';
import { PlantillaService } from '../../../services/plantilla.service';
import { PlantillaCrea } from '../../../models/plantilla-crea';
import { Plantilla } from '../../../models/plantilla';
import { PlantillaSubTarea } from '../../../models/plantilla-sub-tarea';



@Component({
  selector: 'app-item-tarea',
  templateUrl: './item-tarea.component.html',
  styleUrls: ['./item-tarea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemTareaComponent implements OnInit {
  @Input() item: Tarea = new Tarea();
  @Input() listaPlantillas: Plantilla[] = [];



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
  tituloPlantilla: string = "";
  // listaPlantillas: Plantilla[] = [];
  plantillaSeleccionada: number = 0;
  selected = 'none';



  constructor(public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    private modalService: BsModalService,
    private subTareaService: SubtareaService,
    private plantillaService: PlantillaService,
    private toastr: ToastrService) {
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


      const lista = JSON.stringify(this.listaPlantillas);
      // console.log(lista);



    });

    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered'
    });


  }

  cambioEstado(id_subtarea: number) {
    // console.log("cambio estado", id_subtarea);
    this.subTareaService.setSubTareaEstado(id_subtarea).subscribe(subtareas => {
      // const lista = JSON.stringify(subtareas);
      // console.log(lista);
    });

  }


  agregaSubTarea(id_subtarea: number) {

    if (this.tituloSubtarea) {
      let nuevaSubTarea = new SubTarea();
      nuevaSubTarea.titulo = this.tituloSubtarea;
      nuevaSubTarea.id_tarea = id_subtarea;

      this.subTareaService.createSubTarea(nuevaSubTarea).subscribe(subtareas => {
        // const lista = JSON.stringify(subtareas);
        // console.log(lista);
        if (this.listaSubTareas) {
          this.listaSubTareas.push(subtareas);
        } else {
          this.listaSubTareas = [];
          this.subTareaService.getSubTareasTarea(this.item.id).subscribe(subtareas2 => {
            this.listaSubTareas = subtareas2;

          });
        }

      });
      this.tituloSubtarea = "";
    } else {
      if (this.plantillaSeleccionada != 0) {
        // console.log("Se va a crear subtareas de plantilla");
        this.cambioPlantilla();

        this.plantillaSeleccionada = 0;
      }

    }




  }

  deleteSubTarea(id_subtarea: number) {
    this.subTareaService.deleteSubTarea(id_subtarea).subscribe(subtareas => {
      // const lista = JSON.stringify(subtareas);
      // console.log(lista);
      this.listaSubTareas = [];
      this.subTareaService.getSubTareasTarea(this.item.id).subscribe(subtareas => {
        this.listaSubTareas = subtareas;
      });
    });
  }

  // Guarda la plantilla de subtareas que se ven en el listado, con el nombre seleccionado
  guardaPlantilla() {
    if (this.tituloPlantilla) {


      let plantillaNueva: PlantillaCrea = new PlantillaCrea();
      plantillaNueva.tipo_plantilla = 1;
      plantillaNueva.titulo_plantilla = this.tituloPlantilla;
      plantillaNueva.id_usuario = Utils.currentUser.id;
      plantillaNueva.subtareas = this.listaSubTareas;

      this.plantillaService.createPlantilla(plantillaNueva).subscribe(subtareas => {
        this.toastr.success('Guardado', 'Exito!', { positionClass: 'toast-top-center' });
        this.tituloPlantilla = "";

      });
    }
    else {
      this.toastr.warning('Proporcione un nombre de Pantilla', 'Error!', { positionClass: 'toast-top-center' });

    }
  }

  cambioPlantilla() {

    // if (this.plantillaSeleccionada != 0) {
    //   console.log(this.plantillaSeleccionada);
    // }

    let creaPlantillaSubTarea: PlantillaSubTarea = new PlantillaSubTarea();
    creaPlantillaSubTarea.id_plantilla = this.plantillaSeleccionada;
    creaPlantillaSubTarea.id_tarea = this.item.id;

    this.plantillaService.createPlantillaSubTareas(creaPlantillaSubTarea).subscribe(subtareas => {
      this.toastr.success('Plantilla Cargada', 'Exito!', { positionClass: 'toast-top-center' });

      this.subTareaService.getSubTareasTarea(this.item.id).subscribe(subtareas => {
        this.listaSubTareas = subtareas;

      });

    });
  }


}
