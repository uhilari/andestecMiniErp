export interface Seg_Usuario {
  id: string;
  nick: string;
  nombre: string;
  clave?: string;
  esAdmin: boolean;
  email?: string;
}
