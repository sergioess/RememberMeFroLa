import { Component, OnInit, TemplateRef } from '@angular/core';
import { Tablero } from 'src/app/models/tablero';

import { UsuariosService } from '../../../services/usuarios.service';
import { Utils } from '../../../common/utils';
import { TablerosService } from 'src/app/services/tableros.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BitacoraRefreshService } from '../../../services/bitacora-refresh.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-tableros',
  templateUrl: './lista-tableros.component.html',
  styleUrls: ['./lista-tableros.component.css']
})
export class ListaTablerosComponent implements OnInit {

  // Datos en la ventana modal
  modalRef?: BsModalRef;
  tituloTablero: string = "";
  descripcionTablero: string = "";

  listaTableros: Tablero[] = [];


  constructor(private tableroService: TablerosService,
    private usuarioService: UsuariosService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _bitacoraRefreshService: BitacoraRefreshService) { }

  ngOnInit(): void {
    Utils.prevURL = "tableros";
    // console.log("entre tableros");
    if (this.usuarioService.isAuthenticated()) {
      this.traerTablerosUsr();

    }
    else {
      this.navigate("/");
    }

    //TODO:
    this._bitacoraRefreshService.refreshBitacora$.subscribe(valor => {
      this.traerTablerosUsr();
    })
  }


  navigate(arg0: string) {
    throw new Error('Method not implemented.');
  }


  traerTablerosUsr() {
    this.tableroService.getTablerosUsuario(Utils.currentUser.id).subscribe(tableros => {
      this.listaTableros = tableros;
      // const lista = JSON.stringify(tableros);
      // console.log(lista);

    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true, windowClass: 'dark-modal' });
  }

  confirm() {

    if (this.tituloTablero && this.descripcionTablero) {
      let nuevoTablero: Tablero = new Tablero();
      nuevoTablero.id_usuario = Utils.currentUser.id;
      nuevoTablero.titulo = this.tituloTablero;
      nuevoTablero.descripcion = this.descripcionTablero;
      this.tableroService.createTablero(nuevoTablero).subscribe(tableros => {
        // const lista = JSON.stringify(tableros);
        // console.log(lista);
        this.ngOnInit();
        this.modalService.dismissAll();
      });
    }
    else {
      this.toastr.success('Datos Incompletos', 'Tableros', { positionClass: 'toast-top-center' });
    }

  }

}
