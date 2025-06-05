export interface AlbumsStads {
    total_albumes:       number;
    albumes_por_estado:  AlbumesPorEstado[];
    albumes_finalizados: number;
    albumes_por_semana:  AlbumesPorSemana[];
}

export interface AlbumesPorEstado {
    estado: string;
    total:  number;
}

export interface AlbumesPorSemana {
    year:  number;
    week:  number;
    total: number;
}
