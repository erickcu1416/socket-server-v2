export class User {
    public id: string;
    public name: string;
    public sala: string;

    constructor(id: string) {
        this.id = id;
        this.name = 'no-name';
        this.sala = 'no-sala';
    }
}