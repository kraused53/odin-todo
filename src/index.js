import "./styles.css";
import { SEVERITY, } from "./severity";
import { addTask, getAllTasks, loadTaskListFromStorage, removeCompletedTasks } from "./task-list";
import { updateScreen, SCREEN, setCurrentScreen } from "./screen";
import { formatISO } from "date-fns";
import { launchNewDialog } from "./dialogs";

/* Load default tasks {for testing} */
loadTaskListFromStorage();
if(getAllTasks().length === 0) {
    addTask(
        "Relax",
        formatISO(new Date(), { representation: "date" }),
        SEVERITY.LOW,
        "Relaxation is very important",
        false
    );
    addTask(
        "Breathe",
        formatISO(new Date(), { representation: "date" }),
        SEVERITY.HIGH,
        "Breathing is also important",
        false
    );
    addTask(
        "Drink Water",
        formatISO(new Date(), { representation: "date" }),
        SEVERITY.MEDIUM,
        "You should probably have some water",
        false
    );
}


/* Setup navigation buttons */
const allTaskButton = document.getElementById("aside-all-task-button");
allTaskButton.addEventListener('click', () => {
    setCurrentScreen(SCREEN.ALL);
});

const completeTaskButton = document.getElementById("aside-completed-task-button");
completeTaskButton.addEventListener('click', () => {
    setCurrentScreen(SCREEN.COMPLETED);
});

const uncompleteTaskButton = document.getElementById("aside-uncompleted-task-button");
uncompleteTaskButton.addEventListener('click', () => {
    setCurrentScreen(SCREEN.UNCOMPLETED);
});

const lowSeverityTaskButton = document.getElementById("aside-low-severity-task-button");
lowSeverityTaskButton.addEventListener('click', () => {
    setCurrentScreen(SCREEN.LOW);
});

const mediumSeverityTaskButton = document.getElementById("aside-medium-severity-task-button");
mediumSeverityTaskButton.addEventListener('click', () => {
    setCurrentScreen(SCREEN.MEDIUM);
});

const highSeverityTaskButton = document.getElementById("aside-high-severity-task-button");
highSeverityTaskButton.addEventListener('click', () => {
    setCurrentScreen(SCREEN.HIGH);
});

/* Add new item button */
const newTaskButtons = document.getElementById("add-new-task-button");
newTaskButtons.addEventListener("click", () => {
    launchNewDialog();
});

/* Clear completed items button */
const clearCompletedTaskButtons = document.getElementById("clear-completed-tasks-button");
clearCompletedTaskButtons.addEventListener("click", () => {
    removeCompletedTasks();
    updateScreen();
});

/* Display default screen */
setCurrentScreen(SCREEN.ALL);

updateScreen();

// Setup all dialog close buttons
const dialogCloseButtons = document.querySelectorAll(".close-dialog");
dialogCloseButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.parentElement.parentElement.close();
  });
});