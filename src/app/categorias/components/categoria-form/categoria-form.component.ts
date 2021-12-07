import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {


  descripcionData: string = "";

  // formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef<CategoriaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.formInstance = new FormGroup({
    //   "id": new FormControl('', Validators.required),
    //   "descripcion": new FormControl('', Validators.required),
    // });

    // this.formInstance.setValue(data);
  }

  ngOnInit(): void {
    // console.log(this.data);
    this.descripcionData = this.data.descripcion;
  }


  save(): void {
    let categoriaEditar: Categoria = new Categoria();
    categoriaEditar.id = this.data.id;
    categoriaEditar.descripcion = this.descripcionData;
    this.dialogRef.close(Object.assign(new Categoria(), categoriaEditar));
  }
}
