export class Maestros {
    public cod: number;
    public nombre: string;
    public descripcion: string;
    public imagen: string;
    constructor(
        _cod: number,
        _nombre: string,
        _descripcion: string,
        _imagen: string
    ) {
        this.cod = _cod;
        this.nombre = _nombre;
        this.descripcion = _descripcion;
        this.imagen = _imagen;
    }
}