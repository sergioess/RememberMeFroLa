import { SubTarea } from './sub-tarea';

export class PlantillaCrea {
  id: number = 0;
  titulo_plantilla: string = '';
  tipo_plantilla: number = 0;
  id_usuario: number = 0;
  subtareas: SubTarea[] = [];
  created_at: string = '';
  updated_at: string = '';
}
