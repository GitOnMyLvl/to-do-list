class TaskForm {
  constructor(submitCallback) {
    this.submitCallback = submitCallback;
  }

  render() {
    const formHtml = `
    <div id="formModal" class="modal">
      <div class="modal-content">
        <form id="taskForm">
        <input type="text" id="taskName" name="taskName" required>
        <button type="submit">Create Task</button>
        <button type="button" id="cancel" class="cancel-button">Cancel</button>
        </form>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', formHtml);
    this.form = document.getElementById('taskForm');
    this.formModal = document.getElementById('formModal');
    this.attachSubmitEvent();
    this.attachCancelEvent();
  }

  attachSubmitEvent() {
    const form = document.getElementById('taskForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskName = form.taskName.value.trim();
      if (taskName) {
        this.submitCallback({ title: taskName });
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

export default TaskForm;
