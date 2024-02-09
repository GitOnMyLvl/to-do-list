import './styles.css';
import TaskManager from './taskManager.js';
import tasks from './tasks.js';
import Sidebar from './sidebar.js';
import Main from './main.js';

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = new Sidebar('.sidebar');
  const main = new Main('.main');
  const taskManager = new TaskManager('toDoListTasks', () => {
    sidebar.display(
      taskManager.loadTasks(),
      main.display(taskManager.loadTasks().todos),
      console.log('test')
    );
    sidebar.setupAddButton(() => taskManager.addTask('New Task'));
  });

  taskManager.initializeTasks(tasks);
  sidebar.display(taskManager.loadTasks());
  sidebar.setupAddButton(() => taskManager.addTask('New Task'));
});
