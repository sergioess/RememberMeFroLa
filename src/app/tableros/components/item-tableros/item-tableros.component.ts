import { Component, Input, OnInit, TemplateRef } from '@angular/core';

import { Utils } from 'src/app/common/utils';
import { ToastrService } from 'ngx-toastr';

import { BitacoraService } from 'src/app/services/bitacora.service';
import { Bitacora } from '../../../models/bitacora';
import { TablerosService } from 'src/app/services/tableros.service';
import { Tablero } from '../../../models/tablero';
import { Tarea } from '../../../models/tarea';
import { TareasServiceService } from '../../../services/tareas-service.service';
import { Router } from '@angular/router';
import { BitacoraRefreshService } from '../../../services/bitacora-refresh.service';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-item-tableros',
  templateUrl: './item-tableros.component.html',
  styleUrls: ['./item-tableros.component.css']
})
export class ItemTablerosComponent implements OnInit {
  @Input() item: Tablero = new Tablero();
  tituloNuevaTarea: string = "";
  // modalRef?: BsModalRef;

  // nuevaTarea: string="";

  listaTareas: Tarea[] = [];


  constructor(private tareaService: TareasServiceService,
    private tablerosService: TablerosService,
    private router: Router,
    private _bitacoraRefreshService: BitacoraRefreshService,
    private bitacoraService: BitacoraService) { }


  ngOnInit(): void {


    Utils.prevURL = "/tableros";

    this.traerTareas();
    this.tablerosService.tableroPasaDetail = new Tablero();


  }

  traerTareas() {
    // console.log(Utils.currentUser.id);
    this.tareaService.getTareasTablero(this.item.id).subscribe(tareas => {
      this.listaTareas = tareas;
      const lista = JSON.stringify(tareas);
      // console.log(lista);

    });

  }

  abreTablero() {
    // console.log("Abre tablero");
    this.tablerosService.tableroPasaDetail = this.item;
    this.router.navigate(['detalletablero']);
  }

  ngOnDestroy() {
  }

  tareaRapida() {
    // console.log("crear tarea");
    let nuevaTarea = new Tarea();
    nuevaTarea.titulo = this.tituloNuevaTarea;
    nuevaTarea.descripcion = "";
    nuevaTarea.id_usuario = Utils.currentUser.id;
    nuevaTarea.id_tablero = this.item.id;
    this.tareaService.createTareaTablero(nuevaTarea).subscribe(tareas => {

      // const lista = JSON.stringify(tareas);
      // console.log(tareas.body.tarea);
      this.tituloNuevaTarea = "";
      // this.traerTareas();
      let tareaJustCreated = new Tarea();
      tareaJustCreated = tareas;
      this.listaTareas.push(tareaJustCreated);

      this.crearRegistroBitacora(tareaJustCreated);

    });
  }
  crearRegistroBitacora(tareaCreada: Tarea): void {
    let bitacoraNew = new Bitacora();
    bitacoraNew.descripcion = "Tarea Creada";
    bitacoraNew.id_tareas = tareaCreada.id;
    bitacoraNew.id_usuario = Utils.currentUser.id;

    this.bitacoraService.createBitacora(bitacoraNew).subscribe(bitacora => {

      const lista = JSON.stringify(bitacora);
      // console.log(lista);
      let bicacoraJustCreated = new Bitacora();
      bicacoraJustCreated = bitacora.body.tarea;
      // console.log(bicacoraJustCreated)
    });


    // openModal(template: TemplateRef<any>) {
    //   this.modalRef = this.modalService.show(template);
    // }

  }
}
