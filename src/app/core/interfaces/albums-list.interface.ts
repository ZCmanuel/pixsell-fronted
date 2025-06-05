export interface AlbumsList {
  albums: Album[];
  meta: Meta;
}
export interface AlbumsById {
  albums: Album[];
}

export interface Album {
  id_album: number;
  id_usuario: number;
  nombre: string;
  estado: string;
  created_at: Date;
  updated_at: Date;
  usuario: Usuario;
}

export interface Usuario {
  id_usuario: number;
  email: string;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
