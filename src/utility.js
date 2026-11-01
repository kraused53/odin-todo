import { getAllTasks } from "./task-list";

export function logAllTasks() {
    let logString = "Current Tasks:\n\n";
    
    getAllTasks().forEach(item => {
        logString += (item.logString()) + "\n\n";
    });

    console.log(logString);
}