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
      const text = document.createElement('span');
      text.textContent = task.title;
      li.className = 'task';
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '';
      deleteButton.className = 'delete-task';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task.id);
      });
      text.addEventListener('click', () => {
        this.clearSelected(ul);
        li.classList.add('selected');
        onTaskSelected(task);
      });
      li.appendChild(text);
      li.appendChild(deleteButton);
      ul.appendChild(li);
    });
    this.container.appendChild(ul);
  }

  setupAddButton(addTask) {
    const button = document.createElement('button');
    button.textContent = 'Add Task';
    button.className = 'add-task';
    button.addEventListener('click', () => addTask());
    this.container.appendChild(button);
  }

  clearSelected(ul) {
    ul.querySelectorAll('li').forEach((li) => li.classList.remove('selected'));
  }
}

export default Sidebar;
