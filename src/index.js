import './styles.css';
import TaskManager from './taskManager.js';
import TaskForm from './taskForm.js';
import TodoForm from './todoForm.js';
import tasks from './tasks.js';
import Sidebar from './sidebar.js';
import Main from './main.js';

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = new Sidebar('.sidebar');
  const main = new Main('.main');
  const taskManager = new TaskManager('toDoListTasks', () => {
    renderSidebar();
  });

  const taskForm = new TaskForm((task) => {
    if (task.id) {
      taskManager.editTask(task.id, task.title);
    } else {
      taskManager.addTask(task.title);
    }
    renderSidebar();
  });

  const todoForm = new TodoForm((todo) => {
    const currentTaskId = taskManager.getCurrentTaskId();
    if (currentTaskId) {
      console.log(todo);
      if (todo.id) {
        const todoId = todo.id;
        const newTodo = { ...todo };
        taskManager.editTodo(currentTaskId, todoId, newTodo);
        const task = taskManager.getTaskById(currentTaskId);
        renderMain(task);
      } else {
        taskManager.addTodoToTask(currentTaskId, todo);
        const task = taskManager.getTaskById(currentTaskId);
        renderMain(task);
      }
    } else {
      console.error('No current task selected');
    }
  });

  taskManager.initializeTasks(tasks);
  renderSidebar();

  const updateAndDisplayTodos = (task) => {
    todoForm.showForm();
    main.display(
      taskManager.getTaskTodos(task.id),
      () => updateAndDisplayTodos(task),
      (todoId) => {
        taskManager.deleteTodoFromTask(task.id, todoId);
        renderMain(task);
      }
    );
  };

  function handleDeleteTodo(taskId, todoId) {
    taskManager.deleteTodoFromTask(taskId, todoId);
    const todos = taskManager.getTaskTodos(taskId);
    if (todos) {
      const updatedTask = { id: taskId, todos };
      renderMain(updatedTask);
    } else {
      console.error('Failed to find the task after deletion');
    }
  }

  function renderMain(task) {
    taskManager.setCurrentTaskId(task.id);
    main.display(
      task.todos,
      () => updateAndDisplayTodos(task),
      (todoId) => {
        console.log('deleteTodo', todoId);
        handleDeleteTodo(task.id, todoId);
      },
      (todo) => {
        todoForm.showForm(todo);
      },
      (todoId) => {
        taskManager.toggleTodoDone(task.id, todoId);
        const updatedTask = taskManager.getTaskById(task.id);
        renderMain(updatedTask);
      }
    );
  }

  function renderSidebar() {
    sidebar.display(
      taskManager.getTasks(),
      (task) => {
        renderMain(task);
      },
      (taskId) => {
        taskManager.deleteTask(taskId);
        if (taskManager.getCurrentTaskId() === taskId) {
          taskManager.clearCurrentTaskId();
          const remainingTasks = taskManager.getTasks();
          if (remainingTasks.length > 0) {
            renderMain(remainingTasks[0]);
          } else {
            main.clear();
          }
        }
        renderSidebar();
      },
      (taskId) => {
        const taskToEdit = taskManager.getTaskById(taskId);
        if (taskToEdit) {
          taskForm.showForm(taskToEdit);
        }
      }
    );
    sidebar.setupAddButton(() => taskForm.showForm());
  }
});
