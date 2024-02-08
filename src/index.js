import './styles.css';
import TaskManager from './taskManager.js';
import tasks from './tasks.js';

document.addEventListener('DOMContentLoaded', () => {
  const taskManager = new TaskManager('toDoListTasks');
  taskManager.initializeTasks(tasks);
  console.log(taskManager.tasks);
});
