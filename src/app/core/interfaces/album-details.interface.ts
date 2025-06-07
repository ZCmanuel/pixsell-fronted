export interface AlbumDetails {
    id_album:      number;
    nombre:        string;
    descripcion:   null;
    estado:        string;
    created_at:    Date;
    updated_at:    Date;
    imagenes:      Imagene[];
    seleccionadas: Seleccionada[];
}

export interface Imagene {
    id_multimedia: number;
    ruta_archivo:  string;
    url:           string;
    tipo:          string;
}

export interface Seleccionada {
    id_seleccion:  number;
    id_multimedia: number;
    id_album:      number;
    multimedia:    Imagene;
}
