"use strict";

/* BOARD MAIN SCRIPT */

let currentTaskId = null;
let selectedPriority = "";

/**
 * Initializes the application by rendering the header, sidebar, and fetching data.
 * @param {string} header - The ID of the header container.
 * @param {string} sidebar - The ID of the sidebar container.
 * @param {string} link - The ID of the navigation item to focus on.
 */
function init(header, sidebar, link) {
  let boardContent = document.getElementById("board-content");
  renderDesktopTemplate(header, sidebar, link);
  setTimeout(() => {
    loadFetchedData();
    boardContent.classList.remove("hidden");
  }, 100);
}

/**
 * Fetches and renders data from the database.
 * This includes fetching tasks and contacts, followed by rendering tasks.
 * @async
 */
async function loadFetchedData() {
  try {
    await fetchTasksData();
    await fetchContactsData();
  } catch (error) {
    console.error(error);
  }
  renderTasks();
}

/**
 * Opens a popup displaying task details and stores original data for reset functionality.
 * @param {number} taskId - The ID of the task to display.
 */
function openTaskPopUp(taskId) {
  document.getElementById("overlay_task_pop_up").classList.remove("responsive-pop-up-closed");
  let task = tasks.find((t) => t.id === taskId);
  if (task) {
    originalTaskData = JSON.parse(JSON.stringify(task));
    renderTaskPopUp(taskId);
  } else {
    console.error("Task not found:", taskId);
  }
}

/**
 * Opens the "Add Task" popup.
 */
function openAddTaskPopUp() {
  document.getElementById("overlay_add_task_pop_up").classList.remove("responsive-pop-up-closed");

  renderAddTaskPopUp();
}

/**
 * Saves changes to a task and updates the database.
 * @async
 * @param {number} taskId - The ID of the task to save.
 */
async function saveTaskChanges(taskId) {
  if (!errorMessageTitleInput()) return;

  let task = tasks.find((t) => t.id === taskId);
  if (task) {
    updateTaskData(task);
    await updateTaskInFirebase(task);
    afterTaskSaved(taskId);
    showAnimation("Task successfully saved!", "../assets/img/board.png");
  }
}

/**
 * Updates the task data with changes from the edit popup.
 * @param {Object} task - The task object to update.
 */
function updateTaskData(task) {
  task.title = document.getElementById("edit_title").value;
  task.description = document.getElementById("edit_description").value;
  task.dueDate = document.getElementById("edit_due_date").value;
  task.assignedTo = selectedContacts ? [...selectedContacts] : task.assignedTo;
  task.priority = selectedPriority || task.priority;
  task.subtasks = [...addedSubtasks];
}

/**
 * Performs cleanup and UI updates after saving the task.
 * @param {number} taskId - The ID of the task that was saved.
 */
function afterTaskSaved(taskId) {
  renderTasks();
  selectedContacts = [];
  addedSubtasks = [];
  closePopUps();
  openTaskPopUp(taskId);
}

/**
 * Validates the title input field in the task edit form.
 * @returns {boolean} - Returns `true` if the title input is valid (not empty),
 *                      and `false` if it is invalid (empty).
 */
function errorMessageTitleInput() {
  let editTitleInput = document.getElementById("edit_title").value.trim();

  if (editTitleInput === "") {
    document.getElementById("error_message_edit").innerHTML = `Please enter a title!`;
    return false;
  } else {
    document.getElementById("error_message_edit").innerHTML = "";
    return true;
  }
}

/**
 * Returns the color associated with a task's category.
 * @param {string} category - The category of the task.
 * @returns {string} RGB color string.
 */
function getCategoryColor(category) {
  if (category === "User Story") {
    return "rgb(0, 56, 255)";
  } else if (category === "Technical Task") {
    return "rgb(31, 215, 193)";
  }
  return "gray";
}

/**
 * Returns the image path for the specified priority level.
 * @param {string} priority - The priority level ('Low', 'Medium', 'Urgent').
 * @returns {string} Path to the priority image.
 */
function getPriorityImage(priority) {
  if (priority === "Low") {
    return "../assets/img/prio_low_green.png";
  } else if (priority === "Medium") {
    return "../assets/img/prio_medium_orange.png";
  } else if (priority === "Urgent") {
    return "../assets/img/prio_urgent_red.png";
  }
  return "";
}

/**
 * Handles changes to priority buttons in the edit popup.
 * @param {HTMLElement} selectedButton - The selected priority button.
 */
function changePrioButtonsEditPopUp(selectedButton) {
  resetButtonsEditPopUp();

  let priorityConfig = {
    prio_urgent: { class: "prio-urgent-active", img: "../assets/img/urgent21.png", priority: "Urgent", },
    prio_medium: { class: "prio-medium-active", img: "../assets/img/medium.png", priority: "Medium", },
    prio_low: { class: "prio-low-active", img: "../assets/img/low21.png", priority: "Low", },
  };

  let config = priorityConfig[selectedButton.id];
  if (config) {
    selectedButton.classList.add(config.class);
    selectedButton.querySelector(".prio-img").src = config.img;
    selectedPriority = config.priority;
    updateTaskPriority(config.priority);
    checkForChanges();
  }
}

/**
 * Sets the active priority button in the edit popup based on priority.
 * @param {string} priority - The priority level ('Low', 'Medium', 'Urgent').
 */
function setPriorityButton(priority) {
  resetButtonsEditPopUp();

  if (priority === "Urgent") {
    document.getElementById("prio_urgent").classList.add("prio-urgent-active");
    document.getElementById("prio_urgent").querySelector(".prio-img").src =
      "../assets/img/urgent21.png";
  } else if (priority === "Medium") {
    document.getElementById("prio_medium").classList.add("prio-medium-active");
    document.getElementById("prio_medium").querySelector(".prio-img").src =
      "../assets/img/medium.png";
  } else if (priority === "Low") {
    document.getElementById("prio_low").classList.add("prio-low-active");
    document.getElementById("prio_low").querySelector(".prio-img").src =
      "../assets/img/low21.png";
  }
  checkForChanges();
}

/**
 * Updates the priority of the current task.
 * @param {string} priority - The new priority level.
 */
function updateTaskPriority(priority) {
  let task = tasks.find((t) => t.id === currentTaskId);
  if (task) {
    task.priority = priority;
  }
}

/**
 * Resets all priority buttons in the edit popup to their default states.
 */
function resetButtonsEditPopUp() {
  let buttons = document.querySelectorAll(".prio-btn");

  buttons.forEach((button) => {
    let img = button.querySelector(".prio-img");
    if (button.id === "prio_urgent") {
      img.src = "../assets/img/prio_urgent_red.png";
    } else if (button.id === "prio_medium") {
      img.src = "../assets/img/prio_medium_orange.png";
    } else if (button.id === "prio_low") {
      img.src = "../assets/img/prio_low_green.png";
    }
    button.classList.remove("prio-low-active", "prio-medium-active", "prio-urgent-active"
    );
  });
}

/**
 * Updates the image for the "Add Subtask" button.
 * @param {number} taskId - The ID of the parent task.
 */
function updateButtonImage(taskId) {
  let buttonContainer = document.getElementById("input_image_content");
  let inputAddedSubtask = document.getElementById("input_add_subtask").value.trim();

  if (inputAddedSubtask.length > 0) {
    buttonContainer.innerHTML = getBeforeButtonContainer(taskId);
  } else {
    buttonContainer.innerHTML = getAfterButtonContainer();
  }
}

/**
 * Closes all popups.
 */
function closePopUps() {
  document.getElementById("overlay_task_pop_up").classList.add("responsive-pop-up-closed");
  document.getElementById("overlay_add_task_pop_up").classList.add("responsive-pop-up-closed");
  document.getElementById("edit_task_pop_up").classList.add("responsive-pop-up-closed");
}

/**
 * Formats a given date string to (Day/Month/Year).
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string in the format "DD/MM/YYYY".
 */
function formatDate(dateString) {
  let options = { year: "numeric", month: "numeric", day: "numeric" };
  let date = new Date(dateString);
  return date.toLocaleDateString("de-DE", options);
}

/**
 * Sets the minimum date for the due date input field),
 * so that only future or today's dates can be selected.
 *
 * Sets the "min" attribute of the input field to today's date.
 * If no date is set in the input field, it defaults to today's date.
 */
function setMinDateForDueDate() {
  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let day = String(today.getDate()).padStart(2, "0");
  let formattedDate = `${year}-${month}-${day}`;
  let dueDateInput = document.getElementById("edit_due_date");

  dueDateInput.setAttribute("min", formattedDate);

  if (!dueDateInput.value) {
    dueDateInput.value = formattedDate;
  }
}