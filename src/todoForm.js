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
            <button type="button" id="todoCancel" class="cancel-button">Cancel</button>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', formHtml);
    this.form = document.getElementById('todoFormModal');
    this.formModal = document.getElementById('todoForm');
    this.attachSubmitEvent();
    this.attachCancelEvent();
  }

  attachSubmitEvent() {
    const form = document.getElementById('todoForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const todoName = form.todoName.value.trim();
      const todoDescription = form.todoDescription.value.trim();
      const todoDate = form.todoDate.value;
      const todoPriority = form.todoPriority.value;
      if (todoName) {
        this.submitCallback({
          title: todoName,
          description: todoDescription || '',
          dueDate: todoDate,
          priority: todoPriority,
        });
        this.hideForm();
      }
    });
  }

  attachCancelEvent() {
    const cancelButton = document.getElementById('cancel');
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
