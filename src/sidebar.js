class Sidebar {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  display(tasks, onTaskSelected, deleteTask, editTask) {
    this.container.innerHTML = '';
    const ul = document.createElement('ul');
    ul.className = 'task-list';
    tasks.forEach((task) => {
      const li = document.createElement('li');
      const text = document.createElement('span');
      const buttons = document.createElement('div');
      li.className = 'task';
      text.textContent = task.title;
      buttons.className = 'task-buttons';
      const deleteButton = document.createElement('button');
      const editButton = document.createElement('button');
      deleteButton.textContent = '';
      deleteButton.className = 'delete-task';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task.id);
      });
      editButton.textContent = '';
      editButton.className = 'edit-task';
      editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        editTask(task.id);
      });
      text.addEventListener('click', () => {
        this.clearSelected(ul);
        li.classList.add('selected');
        onTaskSelected(task);
      });
      li.appendChild(text);
      buttons.appendChild(editButton);
      buttons.appendChild(deleteButton);
      li.appendChild(buttons);
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

  toggle() {
    this.container.classList.toggle('shown');
  }
}

export default Sidebar;
