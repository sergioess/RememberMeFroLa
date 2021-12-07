import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {

  usuarioForm: FormGroup;

  constructor(private usuariosService: UsuariosService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {
    this.usuarioForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmar_password: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      correo: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  registrarUsuario() {

    let password1: string = this.usuarioForm.get('password')?.value;
    let password2: string = this.usuarioForm.get('confirmar_password')?.value;

    if (password1 === password2) {

      const USUARIO: Usuario = {
        id: 0,
        username: this.usuarioForm.get('username')?.value,
        password: this.usuarioForm.get('password')?.value,
        name: this.usuarioForm.get('nombre_completo')?.value,
        email: this.usuarioForm.get('correo')?.value,
        estado: 1
      }

      this.usuariosService.createUsuario(USUARIO).subscribe(usuario => {
        // console.log(USUARIO);
        const lista = JSON.stringify(USUARIO);
        // console.log(lista);

      });

      this.toastr.success('El usuario se registro de manera exitosa', 'Registro exitoso!', { positionClass: 'toast-top-center' });
      this.router.navigate(['/']);

    } //cierre del if
    else {
      this.toastr.error('Las contraseñas no coinciden', 'Contraseña errada!', { positionClass: 'toast-top-center' });
    }

  }

}
