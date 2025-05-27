export interface UsersList {
    users: User[];
    meta:  Meta;
}

export interface Meta {
    current_page: number;
    last_page:    number;
    per_page:     number;
    total:        number;
}

export interface User {
    id_usuario: number;
    nombre:     string;
    email:      string;
    rol:        string;
    created_at: Date;
    updated_at: Date;
}
