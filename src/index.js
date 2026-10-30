import "./styles.css";
import { SEVERITY, severityCssClass, severityText } from "./severity";
import { defaultTasksAddTask, defaultTasksGetAll, defaultTasksRemoveTask, defaultTasksToggleDone } from "./default-tasks";



const taskId = defaultTasksAddTask(
    "Task name",
    "11/29/1995",
    SEVERITY.LOW,
    "Task details go here...",
    false
);

console.log(defaultTasksGetAll().map(task => ({ ...task })));

defaultTasksToggleDone(taskId);

console.log(defaultTasksGetAll().map(task => ({ ...task })));

defaultTasksRemoveTask(taskId);
console.log(defaultTasksGetAll());