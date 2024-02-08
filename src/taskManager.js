import Storage from './storage.js';

class TaskManager {
  constructor(storageKey) {
    this.storage = new Storage(storageKey);
    this.tasks = [];
  }

  initializeTasks(initialTasks) {
    const tasks = this.loadTasks();
    if (tasks.length > 0) {
      this.tasks = tasks;
    } else {
      this.tasks = initialTasks;
      this.saveTasks();
    }
  }

  saveTasks() {
    this.storage.saveToStorage(this.tasks);
  }

  loadTasks() {
    return this.storage.loadFromStorage();
  }

  deleteTask(taskId) {
    const tasks = this.loadTasks();
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
