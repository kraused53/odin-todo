import { formatISO } from "date-fns";
import { updateScreen } from "./screen";
import { getSeverityFromText, SEVERITY } from "./severity";
import { addTask, editTask, getTask } from "./task-list";


let currentTaskId = null;

const editDialog = document.getElementById("edit-dialog");

const editForm = document.getElementById("edit-form");
editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskName = document.getElementById("edit-task-name").value;
    const taskDate = document.getElementById("edit-task-date").value;
    const taskSeverity = document.getElementById("edit-task-severity").value;
    const taskDetails = document.getElementById("edit-task-details").value;
    const taskDone = document.getElementById("edit-task-done").checked;

    editTask(
        currentTaskId,
        taskName,
        taskDate,
        taskSeverity,
        taskDetails,
        taskDone
    );

    updateScreen();
    editDialog.close();
});

const newDialog = document.getElementById("new-dialog");

const newForm = document.getElementById("new-form");
newForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskName = document.getElementById("new-task-name").value;
    const taskDate = document.getElementById("new-task-date").value;
    const taskSeverity = document.getElementById("new-task-severity").value;
    const taskDetails = document.getElementById("new-task-details").value;
    const taskDone = document.getElementById("new-task-done").checked;

    addTask(
        taskName,
        taskDate,
        getSeverityFromText(taskSeverity),
        taskDetails,
        taskDone
    );

    updateScreen();
    newDialog.close();
});

export function launchEditDialog(taskId) {
    const task = getTask(taskId);

    // Store currently edited task ID
    currentTaskId = taskId;

    const editTaskName = document.getElementById("edit-task-name");
    editTaskName.value = task.name;

    const editTaskDetails = document.getElementById("edit-task-details");
    editTaskDetails.value = task.details;

    const editTaskDate = document.getElementById("edit-task-date");
    editTaskDate.value = task.dueDate;

    const editTaskDone = document.getElementById("edit-task-done");
    if(task.done === true) {
        editTaskDone.checked = true;
    }else {
        editTaskDone.checked = false;
    }

    const lowOption = document.getElementById("edit-low-option");
    const mediumOption = document.getElementById("edit-medium-option");
    const highOption = document.getElementById("edit-high-option");

    lowOption.selected = false;
    mediumOption.selected = false;
    highOption.selected = false;

    switch(task.severity) {
        case SEVERITY.LOW:
            lowOption.selected = true;
            break;
        case SEVERITY.MEDIUM:
            mediumOption.selected = true;
            break;
        case SEVERITY.HIGH:
            highOption.selected = true;
            break;
        default:
            lowOption.selected = true;
            break;
    }

    editDialog.showModal();
}

export function launchNewDialog() {

    const newTaskName = document.getElementById("new-task-name");
    newTaskName.value = "";
    newTaskName.placeholder = "Task name";

    const newTaskDetails = document.getElementById("new-task-details");
    newTaskDetails.value = "";
    newTaskDetails.placeholder = "Description of task";

    const newTaskDate = document.getElementById("new-task-date");
    newTaskDate.value = formatISO(new Date(), { representation: "date" });

    const newTaskDone = document.getElementById("new-task-done");
    newTaskDone.checked = false;

    const lowOption = document.getElementById("new-low-option");
    const mediumOption = document.getElementById("new-medium-option");
    const highOption = document.getElementById("new-high-option");

    lowOption.selected = true;
    mediumOption.selected = false;
    highOption.selected = false;

    newDialog.showModal();
}