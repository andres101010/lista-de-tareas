export interface userLogin {
    email: string,
    password: string
}

export interface user extends userLogin {
    id: number,
    name: string,
    lastName: string,
    created_at: string | number
}

export interface Tareas {
    idtarea: number,
    date: string,
    content: string,
    link: string,
    id_user: number,
    status: string,
    created_at: string | number,
    update_at: string | number,

}

