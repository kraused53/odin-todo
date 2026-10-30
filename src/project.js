export class Project {
    // Tasks map is PRIVATE. System can only manage tasks vis function calls
    #tasks = new Map();

    constructor(name, notes) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.notes = notes;
    }
}