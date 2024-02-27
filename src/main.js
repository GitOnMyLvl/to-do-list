import { parseISO, formatDistance } from 'date-fns';

class Main {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  display(todos = [], addTodo, deleteTodo, editTodo, doneTodo) {
    this.clear();
    const todosContainer = document.createElement('div');
    todosContainer.className = 'todos-container';

    todos.forEach((todo) => {
      const todoElement = document.createElement('div');
      const buttonsContainer = document.createElement('div');
      const deleteButton = document.createElement('button');
      const editButton = document.createElement('button');
      const doneButton = document.createElement('button');
      todoElement.className = 'todo';
      buttonsContainer.className = 'todo-buttons';
      const dueDate = parseISO(todo.dueDate);
      const timeLeft = formatDistance(dueDate, new Date(), { addSuffix: true });
      todoElement.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <p>Due ${timeLeft}</p>
      `;
      if (todo.done) {
        todoElement.classList.add('done');
      }
      todoElement.classList.add(this.setPriorityClass(todo.priority));
      deleteButton.textContent = '';
      deleteButton.className = 'delete-todo';
      deleteButton.addEventListener('click', () => {
        deleteTodo(todo.id);
      });
      editButton.textContent = '';
      editButton.className = 'edit-todo';
      editButton.addEventListener('click', () => {
        editTodo(todo);
      });
      doneButton.textContent = '';
      doneButton.className = 'done-todo';
      doneButton.addEventListener('click', () => {
        doneTodo(todo.id);
        console.log(todo);
      });
      buttonsContainer.appendChild(doneButton);
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

  toggle() {
    this.container.classList.toggle('hidden');
  }
}

export default Main;
