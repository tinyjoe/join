/**
 * Generates the HTML string for a contact item.
 * Includes the contact's initials, name, and a checkbox for selection.
 * @param {Object} contact - The contact data.
 * @param {boolean} isSelected - Whether the contact is selected.
 * @returns {string} The HTML string for the contact item.
 */
function createContactHTML(contact, isSelected) {
  return `
  <div class="nameInitials">
      <div class="contact-initials bg-${contact.color}">
        ${contact.initial}
      </div>
      <span class="contact-name">${contact.name}</span>
  </div>
  <input type="checkbox" 
         name="assignedContacts" 
         class="contact-checkbox" 
         data-name="${contact.name}" 
         ${isSelected ? "checked" : ""} />
`;
}

/**
 * Generates the HTML string for a subtask item.
 * Includes the subtask text and icons for editing and deleting the subtask.
 * @param {string} subtaskText - The text of the subtask.
 * @returns {string} The HTML string for the subtask item.
 */
function createSubtaskHTML(subtaskText) {
  return `
    <div class="subtask-item">
        <span class="subtask-text">${subtaskText}</span>
        <div class="subtask-icons">
            <img src="../assets/img/edit.png" alt="Edit" class="icon" onclick="editSubtask(this.closest('.subtask-item'))">
            <div class="separator"></div>
            <img src="../assets/img/delete.png" alt="Delete" class="icon" onclick="deleteSubtask(this.closest('.subtask-item'))">
        </div>
    </div>
  `;
}

/**
 * Generates the HTML string for a close icon.
 * The icon is used to cancel the subtask addition process.
 * @returns {string} The HTML string for the close icon.
 */
function createCloseIconHTML() {
  return `
    <img src="../assets/img/close.png" class="icon" id="closeIcon" onclick="cancelSubtask()">
  `;
}

/**
 * Generates the HTML string for a subtask input field.
 * Used for editing an existing subtask.
 * @param {string} currentText - The current text of the subtask.
 * @param {number} height - The height of the input field.
 * @returns {string} The HTML string for the subtask input field.
 */
function createSubtaskInputHTML(currentText, height) {
  return `
    <input type="text" class="subtaskInput" value="${currentText}" 
           style="width: 100%; height: ${height}px; background-color: #fff; 
           border: none; outline: none;">
  `;
}

/**
 * Generates the HTML string for the icons displayed during subtask editing.
 * Includes icons for saving and deleting the subtask.
 * @returns {string} The HTML string for the editing icons.
 */
function createEditingIconsHTML() {
  return `
    <img src="../assets/img/delete.png" alt="Löschen" class="icon" 
         onclick="deleteSubtask(this.closest('.subtask-item'))">
    <div class="separator3"></div>
    <img src="../assets/img/propertychecktwo.png" alt="Speichern" class="icon" 
         onclick="finishEditing(this.closest('.subtask-item').querySelector('.subtaskInput'), 
         this.closest('.subtask-item').querySelector('.subtask-text'), 
         this.closest('.subtask-item'))">
  `;
}

/**
 * Generates the HTML string for the default icons displayed with a subtask.
 * Includes icons for editing and deleting the subtask.
 * @returns {string} The HTML string for the default icons.
 */
function createDefaultIconsHTML() {
  return `
    <img src="../assets/img/edit.png" alt="Bearbeiten" class="icon" 
         onclick="editSubtask(this.closest('.subtask-item'))">
    <div class="separator"></div>
    <img src="../assets/img/delete.png" alt="Löschen" class="icon" 
         onclick="deleteSubtask(this.closest('.subtask-item'))">
  `;
}