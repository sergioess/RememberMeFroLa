import { Usuario } from "../models/usuario";



export class Utils {

  public static currentUser: Usuario = new Usuario();
  public static unreadNotifications: number = 0;
  public static prevURL: string = "";

  // public static tableroDetalle: Tablero = new Tablero();


}
