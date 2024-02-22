import Storage from './storage.js';

class TaskManager {
  constructor(storageKey, onTaskUpdated) {
    this.storage = new Storage(storageKey);
    this.tasks = this.getTasks();
    this.currentTaskId = null;
    this.onTaskUpdated = onTaskUpdated;
  }

  initializeTasks(initialTasks) {
    const tasks = this.getTasks();
    if (tasks.length > 0) {
      this.tasks = tasks;
    } else {
      this.tasks = initialTasks;
      this.saveTasks();
    }
  }

  generateUniqueTaskId() {
    return this.tasks.length > 0
      ? Math.max(...this.tasks.map((task) => task.id)) + 1
      : 1;
  }

  addTask(title) {
    const newTask = {
      id: this.generateUniqueTaskId(),
      title,
      todos: [],
    };
    this.tasks.push(newTask);
    this.saveTasks();
    this.onTaskUpdated();
  }

  editTask(taskId, newTitle) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.title = newTitle;
      this.saveTasks();
      this.onTaskUpdated();
    } else {
      console.log('Task not found');
    }
  }

  saveTasks() {
    this.storage.saveToStorage(this.tasks);
  }

  getTasks() {
    return this.storage.loadFromStorage();
  }

  getTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
    if (this.onTaskUpdated) this.onTaskUpdated();
  }

  setCurrentTaskId(taskId) {
    this.currentTaskId = taskId;
  }

  clearCurrentTaskId() {
    this.currentTaskId = null;
  }

  getCurrentTaskId() {
    return this.currentTaskId;
  }

  generateUniqueTodoId() {
    return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }

  addTodoToTask(taskId, newTodo) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      newTodo.id = this.generateUniqueTodoId();
      task.todos.push(newTodo);
      this.saveTasks();
      this.onTaskUpdated();
    } else {
      console.log('Task not found');
    }
  }

  deleteTodoFromTask(taskId, todoId) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.todos = task.todos.filter((todo) => todo.id !== todoId);
      this.saveTasks();
      this.onTaskUpdated();
    } else {
      console.log('Task not found');
    }
  }

  getTaskTodos(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    return task ? task.todos : [];
  }

  editTodo(taskId, todoId, newTodo) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (!task) {
      console.log('Task not found');
      return;
    }
    if (task) {
      const todoIndex = task.todos.findIndex((todo) => todo.id === todoId);
      if (todoIndex === -1) {
        console.log('Todo not found');
        return;
      }
      if (todoIndex !== -1) {
        task.todos[todoIndex] = { ...task.todos[todoIndex], ...newTodo };
        this.saveTasks();
        this.onTaskUpdated();
      } else {
        console.log('Todo not found');
      }
    } else {
      console.log('Task not found');
    }
  }
}

export default TaskManager;
