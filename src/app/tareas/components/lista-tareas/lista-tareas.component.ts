import { Component, OnInit, TemplateRef } from '@angular/core';
import { Tarea } from 'src/app/models/tarea';
import { TareasServiceService } from 'src/app/services/tareas-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'moment';
import { BitacoraService } from 'src/app/services/bitacora.service';
import { Bitacora } from '../../../models/bitacora';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasServiceService } from 'src/app/services/categorias-service.service';
import { Utils } from 'src/app/common/utils';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

//Proteger Rura
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { BitacoraRefreshService } from '../../../services/bitacora-refresh.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltroTarea } from '../../../models/filtro-tarea';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent implements OnInit {
  listaCategorias: Categoria[] = [];
  listaCategoriasFiltro: Categoria[] = [];
  categoriaSeleccionadaFiltro: number = 0;
  listaTareas: Tarea[] = [];
  tituloNuevaTarea: string = "";
  selected = 'none';
  categoriaSeleccionada: number = 0;

  prioridad: number = 0;
  estado: number = 0;

  // Datos en la ventana modal

  constructor(private tareaService: TareasServiceService,
    private _snackBar: MatSnackBar,
    private bitacoraService: BitacoraService,
    private categoriaService: CategoriasServiceService,
    private usuarioService: UsuariosService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _bitacoraRefreshService: BitacoraRefreshService) { }

  ngOnInit(): void {

    Utils.prevURL = "tareas";

    if (this.usuarioService.isAuthenticated()) {
      this.traerTareas();
      this.traerCategorias(Utils.currentUser.id);
    }
    else {
      this.navigate("login");
    }

    //TODO:
    this._bitacoraRefreshService.refreshBitacora$.subscribe(valor => {
      this.traerTareas();
      this.traerCategorias(Utils.currentUser.id);
    })

  }

  traerTareas() {
    // console.log(Utils.currentUser.id);
    this.tareaService.getTareasUsuario(Utils.currentUser.id).subscribe(tareas => {
      this.listaTareas = tareas;
      const lista = JSON.stringify(tareas);
      // console.log(lista);

    });

  }
  tareaRapida() {
    // console.log(this.tituloNuevaTarea);
    let nuevaTarea = new Tarea();
    nuevaTarea.titulo = this.tituloNuevaTarea;
    nuevaTarea.descripcion = "";
    nuevaTarea.id_usuario = Utils.currentUser.id;
    this.tareaService.createTarea(nuevaTarea).subscribe(tareas => {

      const lista = JSON.stringify(tareas);
      console.log(tareas);
      this.tituloNuevaTarea = "";
      this.traerTareas();
      let tareaJustCreated = new Tarea();
      tareaJustCreated = tareas;
      // this.listaTareas.push(tareaJustCreated);

      this.toastr.success('Tarea Creada', 'Tareas', { positionClass: 'toast-top-center' });
      // this._snackBar.open("Tarea Creada", 'Dismiss', { duration: 2000, verticalPosition: 'bottom', panelClass: ['red-snackbar'] });

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




  }

  traerCategorias(id_usuario: number) {
    // console.log("entra traerCategorias");
    this.categoriaService.getCategorias(id_usuario).subscribe(categorias => {
      this.listaCategorias = categorias;
      this.listaCategoriasFiltro = categorias;
      const lista = JSON.stringify(categorias);
      console.log(lista);

    });

  }


  navigate(ruta: string) {
    // console.log(serie);
    // this.router.routeReuseStrategy.shouldReuseRoute = () => true;
    // this.router.onSameUrlNavigation = 'ignore';
    this.router.navigate([ruta]);
  }

  filtroCategorias(categoria: number) {
    // console.log(categoria);

    if (categoria == 0) {
      this.tareaService.getTareasUsuario(Utils.currentUser.id).subscribe(tareas => {
        this.listaTareas = tareas;
        const lista = JSON.stringify(tareas);
        // console.log(lista);

      });
    }
    else {
      let tareaCategoria: Tarea = new Tarea();
      tareaCategoria.id_clasificacion = categoria;
      tareaCategoria.id_usuario = Utils.currentUser.id;
      this.tareaService.getTareasCategoria(tareaCategoria).subscribe(tareas => {
        this.listaTareas = tareas;
        const lista = JSON.stringify(tareas);
        // console.log(lista);

      });
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true, windowClass: 'dark-modal' });
  }

  // this.modalService.open(content, { centered: true });

  hacerFiltro() {
    console.log(this.estado);
    if (this.estado && this.prioridad) {
      console.log("esatado y prioridad");
    }
    else if (this.estado) {
      console.log("esatado");
    }
    else if (this.prioridad) {
      console.log(" prioridad");
    } else if (this.categoriaSeleccionadaFiltro) {
      console.log(" categoria");
    }

    const sumaVariables = this.categoriaSeleccionadaFiltro + this.estado + this.prioridad;
    if (sumaVariables > 0) {
      let filtro = new FiltroTarea();
      filtro.estado = this.estado;
      filtro.categoria = this.categoriaSeleccionadaFiltro;
      filtro.prioridad = this.prioridad;

      this.tareaService.getTareasFiltered(filtro, Utils.currentUser.id).subscribe(tareas => {
        this.listaTareas = tareas;
        const lista = JSON.stringify(tareas);
        console.log(lista);

      });

    }


    this.estado = 0;
    this.prioridad = 0;
    this.categoriaSeleccionadaFiltro = 0;
    this.modalService.dismissAll();
  }

}
