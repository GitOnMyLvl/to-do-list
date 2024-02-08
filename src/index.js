import './styles.css';
import TaskManager from './taskManager.js';
import tasks from './tasks.js';
import Sidebar from './sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = new Sidebar('.sidebar');
  const taskManager = new TaskManager('toDoListTasks');
  taskManager.initializeTasks(tasks);
  sidebar.generate(
    tasks.map((task) => task.title),
    () => {
      console.log('clicked');
    }
  );
});
