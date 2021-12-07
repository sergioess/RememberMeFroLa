import { Component, OnInit, ViewChild } from '@angular/core';
import { BitacoraService } from 'src/app/services/bitacora.service';
import { Bitacora } from '../../../models/bitacora';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

//Proteger Rura
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { Utils } from '../../../common/utils';
import { BitacoraRefreshService } from '../../../services/bitacora-refresh.service';


@Component({
  selector: 'app-lista-bitacora',
  templateUrl: './lista-bitacora.component.html',
  styleUrls: ['./lista-bitacora.component.css']
})
export class ListaBitacoraComponent implements OnInit {
  listaBitacora: Bitacora[] = [];
  dataSource: any = [];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  displayedColumns: string[] = ['bcrea', 'bdes', 'titulo'];
  constructor(private bitacoraService: BitacoraService,
    private usuarioService: UsuariosService,
    private router: Router,
    private bitacoraRefreshService: BitacoraRefreshService) {
    // this.dataSource = this.listaBitacora.slice();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  ngOnInit(): void {

    if (this.usuarioService.isAuthenticated()) {
      this.traerBitacora(Utils.currentUser.id);
    }
    else {
      this.navigate("/");
    }
    //Reemplazar por id del usuario

    //TODO:
    this.bitacoraRefreshService.refreshBitacora$.subscribe(valor => {
      this.traerBitacora(Utils.currentUser.id);
    })
  }

  traerBitacora(id_usuario: number): void {

    this.bitacoraService.getBitacora(id_usuario).subscribe(bitacoras => {
      this.listaBitacora = bitacoras;
      const lista = JSON.stringify(bitacoras);
      // console.log(lista);
      this.dataSource = new MatTableDataSource(this.listaBitacora);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  logData(row: any) {
    // console.log(row);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigate(ruta: string) {
    // console.log(serie);
    this.router.navigate([ruta]);
  }


}
