class TaskForm {
  constructor(submitCallback, editMode = false, task = null) {
    this.submitCallback = submitCallback;
    this.editMode = editMode;
    this.task = task;
    this.render();
  }

  render() {
    console.log('rendering form');
    const formHtml = `
    <div id="formModal" class="modal">
      <div class="modal-content">
        <form id="taskForm">
        <input type="text" id="taskName" name="taskName" required>
        <button type="submit" id="submitBtn">Create Task</button>
        <button type="button" id="cancel" class="cancel-button">Cancel</button>
        </form>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', formHtml);
    this.form = document.getElementById('taskForm');
    this.formModal = document.getElementById('formModal');
    this.submitBtn = document.getElementById('submitBtn');
    this.attachSubmitEvent();
    this.attachCancelEvent();
  }

  attachSubmitEvent() {
    const form = document.getElementById('taskForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskName = form.taskName.value.trim();
      if (taskName) {
        this.submitCallback({
          title: taskName,
          id: this.editMode ? this.task.id : null,
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

  showForm(task = null) {
    if (task) {
      this.task = task;
      this.editMode = true;
      this.form.taskName.value = task.title;
      this.submitBtn.textContent = 'Edit Task';
    } else {
      this.editMode = false;
      this.task = null;
      this.form.reset();
      this.submitBtn.textContent = 'Create Task';
    }
    this.formModal.style.display = 'flex';
  }
}

export default TaskForm;
