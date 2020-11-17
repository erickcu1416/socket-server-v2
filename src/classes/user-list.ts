import { User } from "./user";

export class UserList {
    private list: User[] = [];

    constructor() {}

    // Agregar un usuario
    public add(user: User) {
        this.list.push(user);
        console.log(this.list);
        return user;
    }

    public updatedName(id: string, name: string) {
        for(let user of this.list) {
            if (user.id === id) {
                user.name = name;
                break;
            }
        }

        console.log('============Actualizando usuarios============');
        console.log(this.list);
    }

    // Obtener lista de usuarios
    public getList(): User[] {
        return this.list;
    }

    public getUser(id: string) {
        return this.list.find(user => user.id === id)
    }

    //Obtener usuarios en una sala en particulart
    public getUserBySala(sala: string) {
        return this.list.filter(user => user.sala === sala);
    }

    //Borrar usurios en una
    public deleteUser(id: string) {
        const tempUser = this.getUser(id);
        this.list = this.list.filter(user => user.id !== id);
        // console.log(this.list);
        return tempUser;
    } 
} 