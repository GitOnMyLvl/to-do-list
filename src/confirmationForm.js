class ConformationForm {
  constructor(confirmCallback) {
    this.confirmCallback = confirmCallback;
    this.render();
  }

  render() {
    const formHtml = `
    <div id="confirmFormModal" class="modal">
      <div class="modal-content">
        <form id="confirmForm">
          <h3>Confirm deletion</h3>
          <p>Are you sure you want to delete this?</p>
          <div class="form-buttons">
            <button type="button" id="confirmBtn">Yes</button>
            <button type="button" id="cancelDelete" class="cancel-button">No</button>
          </div>
        </form>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', formHtml);
    this.formModal = document.getElementById('confirmFormModal');
    this.confirmBtn = document.getElementById('confirmBtn');
    this.attachConfirmEvent();
    this.attachCancelEvent();
  }

  attachConfirmEvent() {
    this.confirmBtn.addEventListener('click', () => {
      this.confirmCallback();
      this.hideForm();
    });
  }

  attachCancelEvent() {
    this.cancelBtn = document.getElementById('cancelDelete');
    this.cancelBtn.addEventListener('click', () => {
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

export default ConformationForm;
