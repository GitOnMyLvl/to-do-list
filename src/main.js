import { parseISO, formatDistance } from 'date-fns';

class Main {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  display(todos = [], addTodo, deleteTodo, editTodo) {
    this.clear();
    const todosContainer = document.createElement('div');
    todosContainer.className = 'todos-container';

    todos.forEach((todo) => {
      const todoElement = document.createElement('div');
      const buttonsContainer = document.createElement('div');
      const deleteButton = document.createElement('button');
      const editButton = document.createElement('button');
      todoElement.className = 'todo';
      const dueDate = parseISO(todo.dueDate);
      const timeLeft = formatDistance(dueDate, new Date(), { addSuffix: true });
      todoElement.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <p>Due ${timeLeft}</p>
      `;
      todoElement.classList.add(this.setPriorityClass(todo.priority));
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteTodo(todo.id);
      });
      editButton.addEventListener('click', () => {
        editTodo(todo);
      });
      editButton.textContent = 'Edit';
      buttonsContainer.appendChild(editButton);
      buttonsContainer.appendChild(deleteButton);
      todoElement.appendChild(buttonsContainer);
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

  setPriorityClass(priority) {
    switch (priority) {
      case 'High':
        return 'high-priority';
      case 'Medium':
        return 'medium-priority';
      case 'Low':
        return 'low-priority';
      default:
        return '';
    }
  }
}

export default Main;
