class Sidebar {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  display(titles, clickFunction) {
    const ul = document.createElement('ul');
    ul.className = 'task-list';
    titles.forEach((title, index) => {
      const li = document.createElement('li');
      li.textContent = title;
      li.addEventListener('click', () => clickFunction(index + 1));
      ul.appendChild(li);
    });
    this.container.innerHTML = '';
    this.container.appendChild(ul);
  }
}

export default Sidebar;
