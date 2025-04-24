"use strict";

/* BOARD DROP DOWN  */

/**
 * Toggles the visibility of the dropdown content for the task popup by adding or removing the `d_none` class.
 */
function toggleDropdownTaskPopUp() {
  document.getElementById("dropdown_content").classList.toggle("d_none");
}

/**
 * Toggles the source of the dropdown icon image between "arrow_drop_downaa.png" and "arrow_drop_up.png" to reflect the open/close state.
 */
function toggleInputImage() {
  let inputImage = document.getElementById("dropdown_icon");

  if (inputImage.src.includes("arrow_drop_downaa.png")) {
    inputImage.src = "../assets/img/arrow_drop_up.png";
  } else {
    inputImage.src = "../assets/img/arrow_drop_downaa.png";
  }
}

/**
 * Renders the list of contacts in the dropdown, marking selected contacts as checked and others as unchecked.
 * @param {string} taskId - The ID of the task for which the dropdown contacts should be rendered.
 */
function renderDropdownContacts(taskId) {
  let dropdownContent = document.getElementById("dropdown_contacts");
  dropdownContent.innerHTML = "";
  let task = tasks.find((t) => t.id === taskId);
  selectedContacts = task.assignedTo;
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    if (task.assignedTo) {
      if (task.assignedTo.some((c) => c.name === contact.name)) {
        dropdownContent.innerHTML += getSelectedDropdownContactsTemplate(contact, task);
      } else {
        dropdownContent.innerHTML += getDropdownContactsTemplate(contact, task);
      }
    } else {
      dropdownContent.innerHTML += getDropdownContactsTemplate(contact, task);
    }
  }
}

/**
 * Toggles the selection state of a contact in the dropdown. Updates the checkbox appearance and adds/removes the contact from the selected contacts list.
 * @param {string} contactId - The ID of the contact to toggle.
 * @param {string} taskId - The ID of the task to toggle.
 */
function toggleCheckboxContact(contactId, taskId) {
  let contact = contacts.find((c) => c.id === contactId);
  let task = tasks.find((t) => t.id === taskId);
  let checkbox = document.getElementById(`checkbox_${contact.name}`);
  let selectedContactContent = checkbox.closest(".dropdown-contact");
  if (checkbox.src.includes("checkbox_false.png")) {
    activateCheckbox(checkbox, selectedContactContent);
    addContactToSelected(contactId, taskId);
    renderSelectedContacts(task);
  } else {
    deactivateCheckbox(checkbox, selectedContactContent);
    removeContactFromSelected(contactId, taskId);
    renderSelectedContacts(task);
  }
}

/**
 * Marks a contact checkbox as active and visually indicates that the contact is selected.
 * @param {HTMLElement} checkbox - The checkbox element to activate.
 * @param {HTMLElement} selectedContactContent - The container element for the selected contact, to apply visual changes.
 */
function activateCheckbox(checkbox, selectedContactContent) {
  checkbox.src = "../assets/img/checkbox_true_white.png";
  selectedContactContent.classList.add("checked");
}

/**
 * Marks a contact checkbox as inactive and removes visual indications of selection.
 * @param {HTMLElement} checkbox - The checkbox element to deactivate.
 * @param {HTMLElement} selectedContactContent - The container element for the deselected contact, to remove visual changes.
 */
function deactivateCheckbox(checkbox, selectedContactContent) {
  checkbox.src = "../assets/img/checkbox_false.png";
  selectedContactContent.classList.remove("checked");
}

/**
 * Adds a contact to the `selectedContacts` list.
 * @param {string} contactId - The ID of the contact to add.
 * @param {string} taskId - The ID of the task to update.
 */
function addContactToSelected(contactId, taskId) {
  if (!selectedContacts) selectedContacts = [];
  let task = tasks.find((t) => t.id === taskId);
  let contact = contacts.find((c) => c.id === contactId);
  if (!task.assignedTo) {
    task.assignedTo = [];
  }
  task.assignedTo.push(contact);
  updateTaskInFirebase(task);
}

/**
 * Removes a contact from the `selectedContacts` list by its ID.
 * @param {string} contactId - The ID of the contact to remove.
 * @param {string} taskId - The ID of the task to update.
 */
function removeContactFromSelected(contactId, taskId) {
  let task = tasks.find((t) => t.id === taskId);
  const index = task.assignedTo.findIndex(
    (contact) => contact.id === contactId
  );
  if (index !== -1) {
    task.assignedTo.splice(index, 1);
    updateTaskInFirebase(task);
  }
}