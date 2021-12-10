import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarea } from '../../../models/tarea';
import { DateAdapter } from '@angular/material/core';
import { TareasServiceService } from 'src/app/services/tareas-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bitacora } from '../../../models/bitacora';
import { BitacoraService } from 'src/app/services/bitacora.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasServiceService } from 'src/app/services/categorias-service.service';
import { Utils } from '../../../common/utils';
import { ToastrService } from 'ngx-toastr';
import { BitacoraRefreshService } from '../../../services/bitacora-refresh.service';
import { TablerosService } from 'src/app/services/tableros.service';
import { NotificationsService } from '../../../services/notifications.service';

import * as _moment from 'moment';
import { TableroColaborador } from '../../../models/tablero-colaborador';
import { Notificacion } from '../../../models/notificacion';


@Component({
  selector: 'app-tarea-detail',
  templateUrl: './tarea-detail.component.html',
  styleUrls: ['./tarea-detail.component.css']
})
export class TareaDetailComponent implements OnInit {
  listaCategorias: Categoria[] = [];
  listaColaboradores: TableroColaborador[] = [];
  colaboradorSeleccionado: number = 0;
  selected = 'none';



  datoTarea: Tarea = new Tarea();
  color1: string = "";
  color2: string = "";
  color3: string = "";

  bgcolor1: string = "#FFFFFF";
  bgcolor2: string = "#FFFFFF";
  bgcolor3: string = "#FFFFFF";
  bgcolor4: string = "#FFFFFF";
  bgcolor5: string = "#FFFFFF";

  checked: boolean = false;
  habilita: boolean = true;

  fechaLimiteDetalle: string = "";

  estadoActualTarea: number = 0;
  prioridadActualTarea: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>,
    private tareaService: TareasServiceService,
    private router: Router, private _snackBar: MatSnackBar,
    private bitacoraService: BitacoraService,
    private categoriaService: CategoriasServiceService,
    private _bitacoraRefreshService: BitacoraRefreshService,
    private toastr: ToastrService,
    private notificationService: NotificationsService,
    private tablerosService: TablerosService,
  ) {
    this.dateAdapter.setLocale('es-CO'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.datoTarea = this.data.item;
    // console.log("Datos de la tarea" + JSON.stringify(this.datoTarea));
    this.cambiaEstado(this.datoTarea.estado);
    this.prioridad(this.datoTarea.prioridad);
    this.fechaLimiteDetalle = this.datoTarea.fechalimite;
    this.estadoActualTarea = this.datoTarea.estado;
    this.prioridadActualTarea = this.datoTarea.prioridad;
    this.traerCategorias(Utils.currentUser.id);
    this.colaboradorSeleccionado = this.datoTarea.id_usuario_asignado;

    if (this.datoTarea.id_tablero) {
      this.TraeColaboradores();
    }

  }

  TraeColaboradores() {
    // console.log("Busca Colaboradores");
    this.tablerosService.getColaboradoesTablero(this.datoTarea.id_tablero).subscribe(colaboradores => {
      this.listaColaboradores = colaboradores;
      const lista = JSON.stringify(colaboradores);
      // console.log("Lista Colaboradores" + lista);

    });
  }

  prioridad(priorSel: number): void {
    this.datoTarea.prioridad = priorSel;
    this.bgInitWhite();
    switch (priorSel) {
      case 1:
        this.bgcolor1 = "#00FFFF";
        break;
      case 2:
        this.bgcolor2 = "#00FFFF";
        break;
      case 3:
        this.bgcolor3 = "#00FFFF";
        break;
      case 4:
        this.bgcolor4 = "#00FFFF";
        break;
      case 5:
        this.bgcolor5 = "#00FFFF";
        break;
    }
    // console.log(this.datoTarea.fechalimite);

  }

  bgInitWhite() {
    this.bgcolor1 = "#FFFFFF";
    this.bgcolor2 = "#FFFFFF";
    this.bgcolor3 = "#FFFFFF";
    this.bgcolor4 = "#FFFFFF";
    this.bgcolor5 = "#FFFFFF";
  }

  cambiaEstado(estado: number) {
    switch (estado) {

      case 1:
        this.color1 = "bg-danger";
        this.color2 = "bg-white";
        this.color3 = "bg-white";
        this.datoTarea.estado = 1
        break;
      case 2:
        this.color1 = "bg-danger";
        this.color2 = "bg-secondary";
        this.color3 = "bg-white";
        this.datoTarea.estado = 2
        break;
      case 3:
        this.color1 = "bg-danger";
        this.color2 = "bg-secondary";
        this.color3 = "bg-warning";
        this.datoTarea.estado = 3
        break;
    }
  }

  aceptar(): void {
    const moment = _moment;
    let fecha = moment(this.fechaLimiteDetalle, "YYYY-MM-DD HH:mm Z");
    this.datoTarea.fechalimite = fecha.format('YYYY-MM-DD HH:mm');
    this.tareaService.updateTarea(this.datoTarea.id, this.datoTarea).subscribe(tareas => {

      const lista = JSON.stringify(tareas);
      // console.log(lista);
      // this.crearRegistroBitacora("Tarea Actualizada");
      let texto: string = "Tarea Actualizada ";
      if (this.estadoActualTarea != this.datoTarea.estado) {
        switch (this.datoTarea.estado) {

          case 1:
            texto += " Estado cambiado a Creado";
            break;
          case 2:
            texto += " Estado cambiado a En Proceso";
            break;
          case 3:
            texto += " Estado cambiado a Terminado";
            break;
        }
      }

      if (this.prioridadActualTarea != this.datoTarea.prioridad) {
        texto += " Prioridad cambia a " + this.datoTarea.prioridad;
      }

      if (this.colaboradorSeleccionado !== this.datoTarea.id_usuario_asignado) {
        console.log("Cambio de colaborador");
        //TODO:
        //Crear notificacion tarea asignada

        // console.log("Saco el dato de tablero:" + JSON.stringify(this.datoTarea));

        this.tablerosService.getTableroTarea(this.datoTarea.id_tablero).subscribe(tablero => {
          const lista = JSON.stringify(tablero);
          console.log(lista);

          let mensaje = "Le ha sido asignada la Tarea '" + this.datoTarea.titulo + "' del Tablero '" + tablero.titulo + "' creado por @" + Utils.currentUser.username;
          let notificacionNew: Notificacion = new Notificacion();
          notificacionNew.id_usr_recibe = this.datoTarea.id_usuario_asignado;
          notificacionNew.id_usr_send = Utils.currentUser.id;
          notificacionNew.description = mensaje;
          notificacionNew.type_notification = 2;
          notificacionNew.id_objeto = this.datoTarea.id_tablero;

          this.notificationService.createNotificacion(notificacionNew).subscribe(notifica => {
            const lista = JSON.stringify(notifica);
            console.log(lista);
          });

        });



        // console.log(JSON.stringify("Nueva Notificacion: " + notificacionNew));




      }

      this.crearRegistroBitacora(texto);

      // console.log("Ruta a Abrir: " + Utils.prevURL);
      this.router.navigate([Utils.prevURL]);


      this._bitacoraRefreshService.sendValor(1);

    });
  }

  crearRegistroBitacora(texto: string): void {
    let bitacoraNew = new Bitacora();
    bitacoraNew.descripcion = texto;
    bitacoraNew.id_tareas = this.datoTarea.id;
    bitacoraNew.id_usuario = Utils.currentUser.id;
    bitacoraNew.id_usuario_crea = Utils.currentUser.id;
    // const lista = JSON.stringify(bitacoraNew);
    // console.log("Bitacora Usuario: " + lista);
    this.bitacoraService.createBitacora(bitacoraNew).subscribe(bitacora => {

      const lista = JSON.stringify(bitacora);
      // console.log(lista);
      // let bicacoraJustCreated = new Bitacora();
      // bicacoraJustCreated = bitacora.body.tarea;
      // console.log(bicacoraJustCreated)
    });

    // console.log("Id tablero: " + this.datoTarea.id_tablero);

    if (this.datoTarea.id_tablero > 0) {
      this.tablerosService.getTableroTarea(this.datoTarea.id_tablero).subscribe(tablero => {

        const lista = JSON.stringify(tablero);
        // console.log("Busca el tablero de la tarea: " + tablero);
        // console.log("Busca el tablero de la tarea: " + lista);
        let bitacoraNew2 = new Bitacora();
        bitacoraNew2.descripcion = texto;
        bitacoraNew2.id_tareas = this.datoTarea.id;
        bitacoraNew2.id_usuario = tablero.id_usuario;
        // console.log(tablero.id_usuario);
        const lista2 = JSON.stringify(bitacoraNew2);
        // console.log("Bitacora Tablero: " + lista2);
        this.bitacoraService.createBitacora(bitacoraNew2).subscribe(bitacora => {

          const lista = JSON.stringify(bitacora);
          // console.log(lista);
          let bicacoraJustCreated = new Bitacora();
          bicacoraJustCreated = bitacora.body.tarea;
          // console.log(bicacoraJustCreated)
        });
      });
    }


  }



  navigate(ruta: string) {
    // console.log(serie);
    // this.router.routeReuseStrategy.shouldReuseRoute = () => true;
    // this.router.onSameUrlNavigation = 'ignore';
    this.router.navigate([ruta]);
  }

  eliminar() {
    // console.log("Click eliminar");
    // TODO:
    //La Tarea no puede ser eliminada por un colaborador
    if (this.datoTarea.id_usuario_asignado === Utils.currentUser.id) {
      this.toastr.success('Sólo el creador del tablero puede eliminar una tarea', 'Error', { positionClass: 'toast-top-center' });
    }
    else {
      this.tareaService.deleteTarea(this.datoTarea.id).subscribe(tareas => {

        // const lista = JSON.stringify(tareas);
        // console.log(lista);
        this.toastr.success('Tarea Eliminada', 'Tareas', { positionClass: 'toast-top-center' });
        this.crearRegistroBitacora("Tarea Eliminada");

        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['tareas']);
        });

      });
    }


  }

  esChecked(): void {
    {
      if (this.checked) {
        this.habilita = true;
      }
    }
  }
  traerCategorias(id_usuario: number) {
    // console.log("entra traerCategorias");
    this.categoriaService.getCategorias(id_usuario).subscribe(categorias => {
      this.listaCategorias = categorias;
      const lista = JSON.stringify(categorias);
      // console.log(lista);

    });
  }



}
