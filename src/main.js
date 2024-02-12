class Main {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  display(todos, addTodo) {
    this.container.innerHTML = '';
    const todosContainer = document.createElement('div');
    todosContainer.className = 'todos-container';

    todos.forEach((todo) => {
      const todoElement = document.createElement('div');
      todoElement.className = 'todo';
      todoElement.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <p>${todo.dueDate}</p>
        <p>${todo.priority}</p>
      `;
      todosContainer.appendChild(todoElement);
    });
    this.setupAddButton(addTodo);
    this.container.appendChild(todosContainer);
  }

  setupAddButton(addTodo) {
    const button = document.createElement('button');
    button.textContent = 'Add Todo';
    button.addEventListener('click', () => addTodo());
    this.container.appendChild(button);
  }
}

export default Main;
