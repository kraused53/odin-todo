import { getSeverityFromText, SEVERITY } from "./severity";
import { Task } from "./task";

const taskList = new Map();

function saveTaskList() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(Array.from(taskList.entries()))
    );
}

export function loadTaskListFromStorage() {
    let savedTasks;

    try {
        savedTasks = JSON.parse(
            localStorage.getItem("tasks") || "[]"
        );
    } catch (error) {
        console.error("Failed to load tasks from localStorage:", error);
        return;
    }

    for (const [key, value] of savedTasks) {
        const task = new Task(
            value.name,
            value.dueDate,
            value.severity,
            value.details,
            value.done
        );

        task.id = key;
        taskList.set(key, task);
    }
}

export function addTask(name, dueDate, severity, details, done) {
    const newTask = new Task(name, dueDate, severity, details, done);
    
    // Store tasks in a dictionary indexed by their ID's
    taskList.set(newTask.id, newTask);

    saveTaskList();

    return newTask.id;
}

export function editTask(id, name, dueDate, severity, details, done) {
    const task = taskList.get(id);

    if (!task) {
        console.error(`Cannot edit task: No task found with ID ${id}`);
        return;
    }

    task.name = name;
    task.dueDate = dueDate;
    task.severity = getSeverityFromText(severity);
    task.details = details;
    task.done = done;

    saveTaskList();
}

export function removeTask(id) {
    if (taskList.has(id)) {
        taskList.delete(id);
        saveTaskList();
    }
}

// Return a copy of the task with the given ID
export function getTask(id) {
    const task = taskList.get(id);

    return task ? { ...task } : undefined;
}

// Return an array of copies of all elements in the map
export function getAllTasks() {
    return Array.from(taskList.values()).map(task => ({ ...task }));
}

export function getCompletedTasks() {
    return getAllTasks().filter(item => item.done === true);
}

export function getUncompletedTasks() {
    return getAllTasks().filter(item => item.done === false);
}

export function getLowSeverityTasks() {
    return getAllTasks().filter(item => item.severity === SEVERITY.LOW);
}

export function getMediumSeverityTasks() {
    return getAllTasks().filter(item => item.severity === SEVERITY.MEDIUM);
}

export function getHighSeverityTasks() {
    return getAllTasks().filter(item => item.severity === SEVERITY.HIGH);
}

export function toggleTaskDone(id) {
    if(taskList.has(id)) {
        taskList.get(id).toggleDone();
        saveTaskList();
    }
}

export function removeCompletedTasks() {
    let removedTasks = false;

    for (const [id, task] of taskList) {
        if (task.done === true) {
            taskList.delete(id);
            removedTasks = true;
        }
    }

    if (removedTasks) {
        saveTaskList();
    }
}