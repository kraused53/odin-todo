import { Task } from "./task";

const defaultTasks = new Map();

export function defaultTasksAddTask(name, dueDate, severity, details, done) {
    const newTask = new Task(name, dueDate, severity, details, done);
    
    // Store tasks in a dictionary indexed by their ID's
    defaultTasks.set(newTask.id, newTask);

    return newTask.id;
}

export function defaultTasksRemoveTask(id) {
    if (defaultTasks.has(id)) {
        defaultTasks.delete(id);
    }
}

// Return a copy of the task with the given ID
export function defaultTasksGetTask(id) {
    const task = defaultTasks.get(id);

    return task ? { ...task } : undefined;
}

// Return an array of copies of all elements in the map
export function defaultTasksGetAll() {
    return Array.from(defaultTasks.values()).map(task => ({ ...task }));
}

export function defaultTasksToggleDone(id) {
    const task = defaultTasks.get(id);

    if (task) {
        task.toggleDone();
    }
}