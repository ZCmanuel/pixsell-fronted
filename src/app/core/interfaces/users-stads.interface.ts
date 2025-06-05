export interface UsersStads {
    total_usuarios:      number;
    usuarios_por_semana: UsuariosPorSemana[];
}

export interface UsuariosPorSemana {
    year:  number;
    week:  number;
    total: number;
}
