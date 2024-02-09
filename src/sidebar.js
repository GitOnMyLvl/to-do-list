class Sidebar {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  display(buttonClick, tasks, listClick) {
    this.container.innerHTML = '';
    const button = document.createElement('button');
    button.textContent = 'Add Task';
    button.addEventListener('click', () => buttonClick());
    const ul = document.createElement('ul');
    ul.className = 'task-list';
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task.title;
      li.addEventListener('click', () => listClick(task.index + 1));
      ul.appendChild(li);
    });
    this.container.appendChild(button);
    this.container.appendChild(ul);
  }
}

export default Sidebar;
