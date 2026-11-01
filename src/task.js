import { severityText } from "./severity";

export class Task {
    constructor(name, dueDate, severity, details, done) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.dueDate = dueDate;
        this.severity = severity;
        this.details = details;
        this.done = done;
    }

    toggleDone() {
        this.done = !this.done;
    }

    logString() {
        const toLog = `${this.name}\n\tDue: ${this.dueDate}\n\tSeverity: ${severityText(this.severity)}\n\tDetails: ${this.details}\n\tIs Done: ${this.done}`;

        return toLog;
    }
}