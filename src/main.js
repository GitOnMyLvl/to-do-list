class Main {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  display(todos = [], addTodo, deleteTodo) {
    this.clear();
    const todosContainer = document.createElement('div');
    todosContainer.className = 'todos-container';

    todos.forEach((todo) => {
      const todoElement = document.createElement('div');
      const deleteButton = document.createElement('button');
      todoElement.className = 'todo';
      todoElement.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <p>${todo.dueDate}</p>
        <p>${todo.priority}</p>
      `;
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteTodo(todo.id);
      });
      todoElement.appendChild(deleteButton);
      todosContainer.appendChild(todoElement);
    });
    this.setupAddButton(addTodo);
    this.container.appendChild(todosContainer);
  }

  setupAddButton(addTodo) {
    const button = document.createElement('button');
    button.className = 'add-todo';
    button.textContent = '+';
    button.addEventListener('click', () => addTodo());
    this.container.appendChild(button);
  }

  clear() {
    this.container.innerHTML = '';
  }
}

export default Main;
