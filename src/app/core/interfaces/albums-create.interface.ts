export interface AlbumCreate {
    message:    string;
    album:      Album;
    multimedia: Multimedia[];
}

export interface Album {
    id_usuario: string;
    nombre:     string;
    estado:     string;
    updated_at: Date;
    created_at: Date;
    id_album:   number;
}

export interface Multimedia {
    id_album:     number;
    ruta_archivo: string;
    url:          string;
    tipo:         string;
    created_at:   Date;
    updated_at:   Date;
}
