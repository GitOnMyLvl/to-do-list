import Storage from './storage.js';

class TaskManager {
  constructor(storageKey) {
    this.storage = new Storage(storageKey);
    this.tasks = this.getTasks();
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

  generateUniqueId() {
    return this.tasks.length > 0
      ? Math.max(...this.tasks.map((task) => task.id)) + 1
      : 1;
  }

  addTask(title) {
    const newTask = {
      id: this.generateUniqueId(),
      title,
      todos: [],
    };
    this.tasks.push(newTask);
    this.saveTasks();
    this.onTaskUpdated();
  }

  addTodoToTask(taskId, newTodo) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.todos.push(newTodo);
      this.saveTasks();
    } else {
      console.log('Task not found');
    }
  }

  getTaskTodos(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    return task ? task.todos : [];
  }

  saveTasks() {
    console.log(this.tasks);
    this.storage.saveToStorage(this.tasks);
  }

  getTasks() {
    return this.storage.loadFromStorage();
  }

  deleteTask(taskId) {
    const tasks = this.getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    this.storage.saveToStorage(updatedTasks);
  }

  handleTaskClick(taskId, displayCallback) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      displayCallback(task.todos);
    } else {
      console.log('Task not found');
    }
  }
}

export default TaskManager;
