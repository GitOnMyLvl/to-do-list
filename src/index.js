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

  const updateAndDisplayTodos = (task) => {
    taskManager.addTodoToTask(task.id, testTodo);
    main.display(taskManager.getTaskTodos(task.id), () =>
      updateAndDisplayTodos(task)
    );
  };

  function renderMain(task) {
    main.display(task.todos, () => updateAndDisplayTodos(task));
  }

  function renderSidebar() {
    sidebar.display(taskManager.getTasks(), (task) => {
      renderMain(task);
    });
    sidebar.setupAddButton(() => taskManager.addTask('New Task'));
  }
});

const testTodo = {
  id: '1000',
  title: 'Test Todo',
  description: 'This is a test todo',
  dueDate: '2023-09-23',
  priority: 'High',
};
