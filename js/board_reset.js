"use strict";

/* BOARD RESET */

let originalTaskData = null;

/**
 * Resets all changes made in the task edit popup, including text fields, priority, and dropdown contacts.
 */
function resetTaskChanges() {
  if (!originalTaskData) {
    console.error("No original task data found to reset.");
    return;
  }

  resetTextFields();
  resetPriority();
  showAnimation("Changes reset!", "../assets/img/board.png");
  checkForChanges();
}

/**
 * Resets the text fields in the edit popup to their original values.
 */
function resetTextFields() {
  document.getElementById("edit_title").value = originalTaskData.title;
  document.getElementById("edit_description").value = originalTaskData.description;
  document.getElementById("edit_due_date").value = originalTaskData.dueDate;
}

/**
 * Resets the priority buttons to the original priority.
 */
function resetPriority() {
  setPriorityButton(originalTaskData.priority);
  selectedPriority = originalTaskData.priority;
}

/**
 * Checks for changes made to the task in the edit popup and toggles the state of the reset button.
 */
function checkForChanges() {
  let title = document.getElementById("edit_title").value;
  let description = document.getElementById("edit_description").value;
  let dueDate = document.getElementById("edit_due_date").value;
  let priority = selectedPriority;

  if (
    title !== originalTaskData.title ||
    description !== originalTaskData.description ||
    dueDate !== originalTaskData.dueDate ||
    priority !== originalTaskData.priority
  ) {
    document.getElementById("reset_button").disabled = false;
  } else {
    document.getElementById("reset_button").disabled = true;
  }
}