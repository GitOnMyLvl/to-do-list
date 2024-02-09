class Sidebar {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  display(tasks, onTaskSelected) {
    this.container.innerHTML = '';
    const ul = document.createElement('ul');
    ul.className = 'task-list';
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task.title;
      li.addEventListener('click', () => onTaskSelected(task));
      ul.appendChild(li);
    });
    this.container.appendChild(ul);
  }

  setupAddButton(addTask) {
    const button = document.createElement('button');
    button.textContent = 'Add Task';
    button.addEventListener('click', () => addTask());
    this.container.appendChild(button);
  }
}

export default Sidebar;
