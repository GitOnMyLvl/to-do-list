class Sidebar {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  generate(titles, clickFunction) {
    const ul = document.createElement('ul');
    ul.className = 'task-list';
    titles.forEach((title) => {
      const li = document.createElement('li');
      li.textContent = title;
      li.addEventListener('click', () => {
        clickFunction();
      });
      ul.appendChild(li);
    });
    this.container.innerHTML = '';
    this.container.appendChild(ul);
  }
}

export default Sidebar;
