export interface User {
    user:    UserClass;
    message: string;
}

export interface UserClass {
    id:     number;
    nombre: string;
    email:  string;
    rol:    string;
}
