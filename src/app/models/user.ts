import { Role } from "./role"

export class User {
    id: number
    username: string
    password: string
    name: string
    token: string
    role: Role = Role.USER
}
