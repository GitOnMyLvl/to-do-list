import './styles.css';
import TaskManager from './taskManager.js';
import tasks from './tasks.js';
import Sidebar from './sidebar.js';
import Main from './main.js';

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = new Sidebar('.sidebar');
  const main = new Main('.main');
  const taskManager = new TaskManager('toDoListTasks');
  taskManager.initializeTasks(tasks);
  sidebar.display(
    () => taskManager.addTask('New Task'),
    taskManager.loadTasks(),
    (taskId) =>
      taskManager.handleTaskClick(taskId, (todos) =>
        main.display(todos, () => console.log('Add todo'))
      )
  );
});
