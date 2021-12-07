import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { duration } from 'moment';
import { CategoriasServiceService } from 'src/app/services/categorias-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CategoriaFormComponent } from '../categoria-form/categoria-form.component';

//Proteger Rura
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { Utils } from 'src/app/common/utils';
import { ListaBitacoraComponent } from '../../../bitacora/components/lista-bitacora/lista-bitacora.component';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {
  listaCategorias: Categoria[] = [];
  displayedColumns: string[] = ['id', 'descripcion', 'actions'];
  dataSource: any;
  nombreCategoria: string = "";

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;



  constructor(private categoriaService: CategoriasServiceService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private usuarioService: UsuariosService) { }

  ngOnInit(): void {

    // console.log("Esta autenticado: " + this.usuarioService.isAuthenticated())

    if (this.usuarioService.isAuthenticated()) {
      this.traerCategorias(Utils.currentUser.id);
    }
    else {
      this.navigate("login");
    }


  }

  traerCategorias(id_usuario: number) {
    this.categoriaService.getCategorias(id_usuario).subscribe(categorias => {
      this.listaCategorias = categorias;
      const lista = JSON.stringify(categorias);
      // console.log(lista);
      this.dataSource = new MatTableDataSource(this.listaCategorias);
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

  nuevaCategoria() {
    // console.log(this.nuevacategoria);
    let newCategoria = new Categoria();
    newCategoria.descripcion = this.nombreCategoria;
    newCategoria.id_usuario = Utils.currentUser.id;
    this.categoriaService.createCategoria(newCategoria).subscribe(categorias => {

      const lista = JSON.stringify(categorias);
      // console.log(tareas.body.categoria);
      this.nombreCategoria = "";
      // this.traerTareas();
      /* let categoriaJustCreated = new Categoria();
      categoriaJustCreated.descripcion = categorias.body.descripcion;
      categoriaJustCreated.id_usuario = categorias.body.id_usuario;
      this.listaCategorias.push(categoriaJustCreated);
      this.dataSource = this.listaCategorias; */
      this._snackBar.open("Categoria Creada", 'Dismiss', { duration: 2000, verticalPosition: 'bottom', panelClass: ['red-snackbar'] });
      //this.navigate("categorias");
      this.traerCategorias(Utils.currentUser.id);


    });

  }
  navigate(ruta: string) {
    console.log(ruta);
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([ruta]);
  }


  edit(data: Categoria) {
    const dialogRef = this.dialog.open(CategoriaFormComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {

      // console.log(result);
      if (result) {
        this.categoriaService.updateCategorias(result.id, result).subscribe(categorias => {

          const lista = JSON.stringify(categorias);
          // console.log("Respuesta despues Editar categoria: " + lista);
          this.traerCategorias(Utils.currentUser.id);

        });
      }
    });
  }

  delete(id: any) {
    // console.log("El id: " + id);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoriaService.removeCategoria(id).subscribe(categorias => {

          const lista = JSON.stringify(categorias);
          // console.log("Respuesta despues Editar categoria: " + lista);
          this.traerCategorias(Utils.currentUser.id);

        });
      }
    });
  }

}
