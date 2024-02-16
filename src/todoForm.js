class TodoForm {
  constructor(submitCallback) {
    this.submitCallback = submitCallback;
  }

  render() {
    const formHtml = `
    <div id="todoFormModal" class="modal">
        <div class="modal-content">
          <form id="todoForm">
            <label for="todoTitle">Title:</label>
            <input type="text" id="todoTitle" name="todoTitle" required>
            
            <label for="todoDescription">Description:</label>
            <input type="text" id="todoDescription" name="todoDescription">
            
            <label for="todoDueDate">Due Date:</label>
            <input type="date" id="todoDueDate" name="todoDueDate" required>
            
            <label for="todoPriority">Priority:</label>
            <select id="todoPriority" name="todoPriority">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            
            <button type="submit">Add Todo</button>
            <button type="button" id="cancel-todo" class="cancel-button">Cancel</button>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', formHtml);
    this.formModal = document.getElementById('todoFormModal');
    this.form = document.getElementById('todoForm');
    this.attachSubmitEvent();
    this.attachCancelEvent();
  }

  attachSubmitEvent() {
    const form = document.getElementById('todoForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const todoTitle = form.todoTitle.value.trim();
      const todoDescription = form.todoDescription.value.trim();
      const todoDueDate = form.todoDueDate.value;
      const todoPriority = form.todoPriority.value;
      if (todoTitle) {
        this.submitCallback({
          title: todoTitle,
          description: todoDescription || '',
          dueDate: todoDueDate,
          priority: todoPriority,
        });
        this.hideForm();
      }
    });
  }

  attachCancelEvent() {
    const cancelButton = document.getElementById('cancel-todo');
    cancelButton.addEventListener('click', () => {
      this.hideForm();
    });
  }

  hideForm() {
    this.formModal.style.display = 'none';
  }

  showForm() {
    this.formModal.style.display = 'flex';
  }
}

export default TodoForm;
