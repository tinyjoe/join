"use strict";

/* BOARD SUBTASK */

/**
 * Toggles the completion state of a subtask.
 * @param {number} taskId - The ID of the parent task.
 * @param {number} index - The index of the subtask in the task's subtasks array.
 */
function toggleSubtasksCheckbox(taskId, index) {
  let checkbox = document.getElementById(`checkbox_subtask_${taskId}_${index}`);
  let task = tasks.find((t) => t.id === taskId);
  if (checkbox.src.includes("checkbox_false.png")) {
    checkbox.src = "../assets/img/checkbox_true.png";
    task.subtasks[index].completed = true;
    updateTaskInFirebase(task);
  } else {
    checkbox.src = "../assets/img/checkbox_false.png";
    task.subtasks[index].completed = false;
    updateTaskInFirebase(task);
  }
  renderTasks();
}

/**
 * Adds a new subtask in the "Edit Task" popup.
 * @param {number} taskId - The ID of the parent task.
 */
function addSubtaskEditPopUp(taskId) {
  let inputAddedSubtask = document.getElementById("input_add_subtask");
  let addedSubtaskTitle = inputAddedSubtask.value.trim();
  let task = tasks.find((t) => t.id === taskId);
  addedSubtasks = task.subtasks ? task.subtasks : [];
  let addedSubtask = {
    id: generateUniqueId(),
    name: addedSubtaskTitle,
    completed: false,
  };
  if (errorMessage()) {
    return;
  } else {
    addedSubtasks.push(addedSubtask);
    renderAddSubtasksEditPopUp(task);
    updateTaskInFirebase(task);
    clearInputs(taskId);
  }
  updateButtonImage(taskId);
}

/**
 * Handles the key press event for the subtask input.
 * Adds a new subtask if the Enter key is pressed.
 * @param {KeyboardEvent} event - The keyboard event.
 * @param {number} taskId - The ID of the parent task.
 */
function handleSubtaskKeyPress(event, taskId) {
  if (event.key === "Enter") {
    addSubtaskEditPopUp(taskId);
  }
}

/**
 * Deletes a subtask from the "Edit Task" popup.
 * @param {string} name - The name of the subtask to delete.
 * @param {string} taskId - The ID of the task which should be updated.
 */
function deleteAddedSubtaskEditPopUp(name, taskId) {
  let task = tasks.find((t) => t.id === taskId);
  let index = addedSubtasks.findIndex(
    (addedSubtask) => addedSubtask.name === name
  );
  if (index !== -1) {
    addedSubtasks.splice(index, 1);
    renderAddSubtasksEditPopUp(task);
  } else {
    console.error("subtask not found!", addedSubtasks);
  }
}

/**
 * Edits a subtask in the "Edit Task" popup.
 * @param {string} subId - The ID of the subtask to edit.
 * @param {string} taskId - The ID of the task which should be updated.
 */
function editSubtaskEditPopUp(subId, taskId) {
  let task = tasks.find((t) => t.id === taskId);
  addedSubtasks = task.subtasks ? task.subtasks : [];
  let subtask = addedSubtasks.find((sub) => sub.id === subId);
  if (!subtask) return;
  let editedSubtask = document.querySelector(`li[data-id="${subId}"]`);
  if (!editedSubtask) return;
  editedSubtask.classList.add("editing");
  editedSubtask.innerHTML = getEditSubtaskInput(subId, subtask, task);
}

/**
 * Saves changes to an edited subtask.
 * @param {string} subId - The ID of the subtask to save.
 * @param {string} newTitle - The updated title of the subtask.
 * @param {string} taskId - The ID of the task which should be updated.
 */
function saveEditedSubtaskEditPopUp(subId, newTitle, taskId) {
  let task = tasks.find((t) => t.id === taskId);
  addedSubtasks = task.subtasks ? task.subtasks : [];
  let subtaskIndex = addedSubtasks.findIndex((sub) => sub.id === subId);
  if (subtaskIndex !== -1 && newTitle.trim() !== "") {
    addedSubtasks[subtaskIndex].name = newTitle.trim();
  }
  updateTaskInFirebase(task);
  renderAddSubtasksEditPopUp(task);
}

/**
 * Handles pressing the Enter key during subtask editing.
 * @param {KeyboardEvent} event - The key event.
 * @param {string} id - The ID of the subtask.
 * @param {HTMLInputElement} inputElement - The input element for editing the subtask.
 * @param {string} taskId - The ID of the task which should be updated.
 */
function handleEnterKey(event, id, inputElement, taskId) {
  if (event.key === "Enter") {
    saveEditedSubtaskEditPopUp(id, inputElement.value, taskId);
  }
}

/**
 * Get the count of the Subtasks of a Task.
 * @param {object} task - The object of the task.
 */
function getCompletedSubtasksCount(task) {
  let completedSubTasks = [];
  for (let i = 0; i < task.subtasks.length; i++) {
    const subtask = task.subtasks[i];
    if (subtask.completed) {
      completedSubTasks.push(subtask);
    }
  }
  return completedSubTasks.length;
}

/**
 * Get the percentage of the completed Subtasks of a Task.
 * @param {object} task - The object of the task.
 */
function getSubtasksProgress(task) {
  if (task.subtasks) {
    let subTaskCount = task.subtasks.length;
    let completedSubTasks = getCompletedSubtasksCount(task);
    return (completedSubTasks / subTaskCount) * 100;
  }
}

/**
 * Clears input fields in the "Edit Task" popup.
 * @param {number} taskId - The ID of the parent task.
 */
function clearInputs(taskId) {
  document.getElementById("input_add_subtask").value = "";
  updateButtonImage(taskId);
}

/**
 * Displays an error message if no subtask input is provided.
 * @returns {boolean} True if there is an error, false otherwise.
 */
function errorMessage() {
  let inputAddedSubtask = document.getElementById("input_add_subtask").value.trim();

  if (inputAddedSubtask === "") {
    document.getElementById("error_message").innerHTML = `Please enter a subtask!`;
    return true;
  }
  document.getElementById("error_message").innerHTML = "";
  return false;
}

/**
 * Changes an image based on the action ('edit' or 'delete').
 * @param {string} imgageId - The ID of the image element.
 * @param {string} action - The action type ('edit' or 'delete').
 */
function changeImage(imgageId, action) {
  let img = document.getElementById(imgageId);

  if (action === "edit") {
    if (img.src.includes("edit_blue.png")) {
      img.src = "../assets/img/edit_black.png";
    } else {
      img.src = "../assets/img/edit_blue.png";
    }
  } else if (action === "delete") {
    if (img.src.includes("delete_blue.png")) {
      img.src = "../assets/img/delete_black.png";
    } else {
      img.src = "../assets/img/delete_blue.png";
    }
  }
}

/**
 * Changes the "plus" image on hover.
 * @param {Event} event - The hover event.
 */
function changePlusImage(event) {
  let img = event.target;

  if (img.src.includes("plus_black.png")) {
    img.src = "../assets/img/plus_blue.png";
  } else {
    img.src = "../assets/img/plus_black.png";
  }
}

/**
 * Shows icons for a list item.
 * @param {HTMLElement} listItem - The list item element.
 */
function showIcons(listItem) {
  let iconContainer = listItem.querySelector(".list-icon-container");
  iconContainer.style.visibility = "visible";
}

/**
 * Hides icons for a list item.
 * @param {HTMLElement} listItem - The list item element.
 */
function hideIcons(listItem) {
  let iconContainer = listItem.querySelector(".list-icon-container");
  iconContainer.style.visibility = "hidden";
}