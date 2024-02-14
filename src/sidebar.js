class Sidebar {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  display(tasks, onTaskSelected, deleteTask) {
    this.container.innerHTML = '';
    const ul = document.createElement('ul');
    ul.className = 'task-list';
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task.title;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task.id);
      });
      li.addEventListener('click', () => onTaskSelected(task));
      li.appendChild(deleteButton);
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
