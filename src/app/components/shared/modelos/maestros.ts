export class Maestros {
    public nombre: string;
    public descripcion: string;
    public imagen: string;
    constructor(
        _nombre: string,
        _descripcion: string,
        _imagen: string
    ) {
        this.nombre = _nombre;
        this.descripcion = _descripcion;
        this.imagen = _imagen;
    }
}