export class Task {
    constructor(name, dueDate, severity, details, done) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.dueDate = dueDate;
        this.severity = severity;
        this.details = details;
        this.done = done;
    }

    toggleDone = function() {
        this.done = !this.done;
    }
}