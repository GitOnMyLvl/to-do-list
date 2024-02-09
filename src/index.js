import './styles.css';
import TaskManager from './taskManager.js';
import tasks from './tasks.js';
import Sidebar from './sidebar.js';
import Main from './main.js';

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = new Sidebar('.sidebar');
  const main = new Main('.main');
  const taskManager = new TaskManager('toDoListTasks', () => {
    renderSidebar();
  });

  taskManager.initializeTasks(tasks);
  renderSidebar();

  function renderSidebar() {
    sidebar.display(taskManager.loadTasks(), (task) => {
      main.display(task.todos);
      main.setupAddButton(() => taskManager.addTodoToTask(task.id, testTodo));
    });
    sidebar.setupAddButton(() => taskManager.addTask('New Task'));
  }
});

const testTodo = {
  title: 'Test Todo',
  description: 'This is a test todo',
  dueDate: '2023-09-23',
  priority: 'High',
};
