import { getAllTasks, toggleTaskDone, removeTask, getCompletedTasks, getUncompletedTasks, getLowSeverityTasks, getMediumSeverityTasks, getHighSeverityTasks } from "./task-list";
import { severityCssClass } from "./severity";
import { launchEditDialog } from "./dialogs";
import { format, parseISO } from "date-fns";

export const SCREEN = Object.freeze({
    ALL: "all",
    COMPLETED: "completed",
    UNCOMPLETED: "uncompleted",
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high"
});

const main = document.querySelector("main");
const allTaskButton = document.getElementById("aside-all-task-button");
const completeTaskButton = document.getElementById("aside-completed-task-button");
const uncompleteTaskButton = document.getElementById("aside-uncompleted-task-button");
const lowSeverityTaskButton = document.getElementById("aside-low-severity-task-button");
const mediumSeverityTaskButton = document.getElementById("aside-medium-severity-task-button");
const highSeverityTaskButton = document.getElementById("aside-high-severity-task-button");

let currentScreen = SCREEN.ALL;


export function setCurrentScreen(screen) {
    currentScreen = screen;
    updateScreen();
}

function removeAsideTags() {
    allTaskButton.classList.remove("aside-selected");
    completeTaskButton.classList.remove("aside-selected");
    uncompleteTaskButton.classList.remove("aside-selected");
    lowSeverityTaskButton.classList.remove("aside-selected");
    mediumSeverityTaskButton.classList.remove("aside-selected");
    highSeverityTaskButton.classList.remove("aside-selected");

    allTaskButton.classList.remove("aside-unselected");
    completeTaskButton.classList.remove("aside-unselected");
    uncompleteTaskButton.classList.remove("aside-unselected");
    lowSeverityTaskButton.classList.remove("aside-unselected");
    mediumSeverityTaskButton.classList.remove("aside-unselected");
    highSeverityTaskButton.classList.remove("aside-unselected");
}

export function updateScreen() {
    // Clear old contents
    main.replaceChildren();

    let tasksToDisplay = new Array(0);

    switch(currentScreen) {
        case SCREEN.ALL:
            removeAsideTags();
            allTaskButton.classList.add("aside-selected");
            tasksToDisplay = getAllTasks();
            break;
        
        case SCREEN.COMPLETED:
            removeAsideTags();
            completeTaskButton.classList.add("aside-selected");
            tasksToDisplay = getCompletedTasks();
            break;
        
        case SCREEN.UNCOMPLETED:
            removeAsideTags();
            uncompleteTaskButton.classList.add("aside-selected");
            tasksToDisplay = getUncompletedTasks();
            break;
        
        case SCREEN.LOW:
            removeAsideTags();
            lowSeverityTaskButton.classList.add("aside-selected");
            tasksToDisplay = getLowSeverityTasks();
            break;
        
        case SCREEN.MEDIUM:
            removeAsideTags();
            mediumSeverityTaskButton.classList.add("aside-selected");
            tasksToDisplay = getMediumSeverityTasks();
            break;
        
        case SCREEN.HIGH:
            removeAsideTags();
            highSeverityTaskButton.classList.add("aside-selected");
            tasksToDisplay = getHighSeverityTasks();
            break;
    }

    // Fill in cards
    tasksToDisplay.forEach(item => {
        main.appendChild(makeTaskCard(item));
    });
}

function makeTaskCard(task) {
    // Make card
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    taskCard.id = task.id;

    // Make name
    const taskName = document.createElement("h3");
    taskName.classList.add("card-name");
    taskName.textContent = task.name;

    // Make due date
    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("card-date");
    taskDueDate.textContent = "Due By: "+format(parseISO(task.dueDate), "MMMM do, yyyy");

    // Make severity
    const taskSeverity = document.createElement("div");
    taskSeverity.classList.add("card-severity", severityCssClass(task.severity));

    // Make notes
    const taskNotes = document.createElement("p");
    taskNotes.classList.add("card-notes");
    taskNotes.textContent = task.details;

    // Make control
    const cardControl = document.createElement("p");
    cardControl.classList.add("card-control");

    // Make buttons
    const checkButton = document.createElement('button');
    checkButton.type = "button";
    checkButton.classList.add('card-check-button', 'icon-button');

    if(task.done === true) {
        checkButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>checkbox-marked</title>
                <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
            </svg>
        `;
    }else {
        checkButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>checkbox-blank-outline</title>
                <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />
            </svg>
        `;
    }

    checkButton.addEventListener('click', () => {
        toggleTaskDone(taskCard.id);
        updateScreen();
    });

    const editButton = document.createElement('button');
    editButton.type = "button";
    editButton.classList.add('card-edit-button', 'icon-button');
    editButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>pencil</title>
            <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
        </svg>
    `;

    editButton.addEventListener('click', () => {
        launchEditDialog(task.id)
    });

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.classList.add('card-delete-button', 'icon-button');

    deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>trash-can-outline</title>
            <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
        </svg>
    `;

    deleteButton.addEventListener('click', () => {
        removeTask(taskCard.id);
        updateScreen();
    });

    cardControl.appendChild(checkButton);
    cardControl.appendChild(editButton);
    cardControl.appendChild(deleteButton);

    // Add items to card
    taskCard.appendChild(taskName);
    taskCard.appendChild(taskDueDate);
    taskCard.appendChild(taskNotes);
    taskCard.appendChild(taskSeverity);
    taskCard.appendChild(cardControl);

    return taskCard;
}