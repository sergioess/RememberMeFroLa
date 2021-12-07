import { Component, Inject, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TablerosService } from '../../../services/tableros.service';
import { Tablero } from '../../../models/tablero';
import { Router } from '@angular/router';
import { TableroColaborador } from '../../../models/tablero-colaborador';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Utils } from 'src/app/common/utils';
import { ConfirmatioDelColaComponent } from '../confirmatio-del-cola/confirmatio-del-cola.component';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsuariosService } from '../../../services/usuarios.service';
import { NotificationsService } from '../../../services/notifications.service';
import { Notificacion } from '../../../models/notificacion';






@Component({
  selector: 'app-detail-tablero',
  templateUrl: './detail-tablero.component.html',
  styleUrls: ['./detail-tablero.component.css']
})


export class DetailTableroComponent implements OnInit {

  // Datos en la ventana modal
  modalRef?: BsModalRef;
  nuevoColaborador: string = "";

  listaColaboradores: TableroColaborador[] = [];
  detalleTablero!: Tablero;

  displayedColumns: string[] = ['id', 'username', 'aceptado', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  constructor(private tablerosService: TablerosService,
    private router: Router,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private modalService: BsModalService,
    private usuariosService: UsuariosService,
    private notificationService: NotificationsService) { }


  ngOnInit(): void {
    console.log("Reload: " + JSON.stringify(this.tablerosService.tableroPasaDetail));
    this.detalleTablero = this.tablerosService.tableroPasaDetail;
    console.log("Detalle Tablero" + this.detalleTablero);
    console.log(JSON.stringify("Detalle Tablero: " + this.detalleTablero));
    this.TraeColaboradores();



  }


  regresar() {
    this.router.navigate(['tableros']);
  }

  TraeColaboradores() {
    console.log("Busca Colaboradores");
    this.tablerosService.getColaboradoesTablero(this.detalleTablero.id).subscribe(colaboradores => {
      this.listaColaboradores = colaboradores;
      const lista = JSON.stringify(colaboradores);
      // console.log("Lista Colaboradores" + lista);

      this.dataSource = new MatTableDataSource(this.listaColaboradores);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(data: TableroColaborador) {
    // const dialogRef = this.dialog.open(CategoriaFormComponent, {
    //   width: '400px',
    //   data: data
    // });

    // dialogRef.afterClosed().subscribe(result => {

    //   // console.log(result);
    //   if (result) {
    //     this.categoriaService.updateCategorias(result.id, result).subscribe(categorias => {

    //       const lista = JSON.stringify(categorias);
    //       // console.log("Respuesta despues Editar categoria: " + lista);
    //       this.traerCategorias(Utils.currentUser.id);

    //     });
    //   }
    // });
  }

  delete(id: any) {
    // console.log("El id: " + id);
    const dialogRef = this.dialog.open(ConfirmatioDelColaComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tablerosService.removeColaborador(id).subscribe(colaborador => {

          const lista = JSON.stringify(colaborador);
          // console.log("Respuesta despues Editar categoria: " + lista);
          this.TraeColaboradores();

        });
      }
    });
  }

  openBottomSheet(dato: TableroColaborador): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet, {
      data: { dato },
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // metodo de aceptar en la ventana modal para crear colaborador
  confirm() {
    let agregaColaborador: TableroColaborador = new TableroColaborador();

    //traer el id del usuario
    this.usuariosService.getUsuarioByCorreoUser(this.nuevoColaborador).subscribe(usuario => {

      const usuarioColaborador = JSON.stringify(usuario);
      // console.log("Usuario Colaborador: " + usuarioColaborador);

      //creo el registro de colaborador
      agregaColaborador.aceptado = false;
      agregaColaborador.id_colaborador = usuario.id
      agregaColaborador.rol = 1
      agregaColaborador.id_tablero = this.detalleTablero.id


      this.tablerosService.createTableroColaborador(agregaColaborador).subscribe(tablero => {

        // const lista = JSON.stringify(tablero);
        // console.log(tareas.body.tarea);

        // TODO: crea la notificacion
        let mensaje = "Has sido invitado a participar del Tablero '" + this.detalleTablero.titulo + "' creado por @" + Utils.currentUser.username;
        let notificacionNew: Notificacion = new Notificacion;
        notificacionNew.id_usr_recibe = usuario.id;
        notificacionNew.id_usr_send = Utils.currentUser.id;
        notificacionNew.description = mensaje;
        notificacionNew.type_notification = 1;
        notificacionNew.id_objeto = this.detalleTablero.id;

        console.log(JSON.stringify("Nueva Notificacion: " + notificacionNew));

        this.notificationService.createNotificacion(notificacionNew).subscribe(notifica => {
          const lista = JSON.stringify(notifica);
          console.log(lista);
        });

        this.ngOnInit();

      });

      this.nuevoColaborador = "";

    });



    //Agregar el colaborador

  }

  decline() {

  }

}


//Inicio Dialog
@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: './bottom-sheet-overview-example.html',
})
export class BottomSheetOverviewExampleSheet implements OnInit {
  // @Input() item: TableroColaborador = new TableroColaborador();

  tableroColaborador: TableroColaborador = new TableroColaborador();

  idTablero: number = 0;
  elRol: number = 0;
  correoColaborador: string = "";
  selected: number = 0;

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private tablerosService: TablerosService,
    private router: Router,) { }

  ngOnInit(): void {
    const lista = JSON.stringify(this.data.dato);
    this.tableroColaborador = this.data.dato;
    console.log("El Id de la Tarea es: " + this.data.dato.tid);
    // console.log("Tarea Id" + lista[tid]);
    this.idTablero = this.data.dato.tid;
    this.selected = this.data.dato.crol;
    this.elRol = this.data.dato.crol;
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  save() {
    let colaboradorTablero: TableroColaborador = new TableroColaborador();
    colaboradorTablero.rol = this.elRol;

    this.tablerosService.updateRolColaborador(this.data.dato.id, colaboradorTablero).subscribe(coltablero => {

      const lista = JSON.stringify(coltablero);
      console.log(lista);
      // this.crearRegistroBitacora("Tarea Actualizada");

      // this.router.navigateByUrl("tareas");
      this._bottomSheetRef.dismiss();
      this.tablerosService.tableroPasaDetail = this.data.dato;
      location.reload();

    });


  }


}
//Fin Dialog
