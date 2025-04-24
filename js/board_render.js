"use strict";

/* BOARD RENDER */

/**
 * Renders the desktop template including header and sidebar.
 * @param {string} header - The ID of the header container.
 * @param {string} sidebar - The ID of the sidebar container.
 * @param {string} link - The ID of the navigation item to focus on.
 */
function renderDesktopTemplate(header, sidebar, link) {
  createHeader(header);
  createSidebar(sidebar, link);
  let boardHeadlineContent = document.getElementById("board_headline");
  boardHeadlineContent.innerHTML = getBoardHeadlineTemplate();
}

/**
 * Renders all tasks in their respective columns based on status.
 */
function renderTasks() {
  const columns = {
    todo: document.getElementById("to_do"),
    in_progress: document.getElementById("in_progress"),
    await_feedback: document.getElementById("await_feedback"),
    done: document.getElementById("done"),
  };

  for (let column in columns) {
    columns[column].innerHTML = "";
  }
  tasks.forEach((task) => {
    let priorityImage = getPriorityImage(task.priority);
    let categoryColor = getCategoryColor(task.category);
    let assigneeInitials = renderAssigneeInitials(task.assignedTo);
    const column = columns[task.status];
    if (column) {
      column.innerHTML += getTasksTemplate(task, priorityImage, categoryColor, assigneeInitials, renderProgressString(task), getSubtasksProgress(task));
    }
  });
  emptyColumnMessage();
}

/**
 * Renders a popup with task details.
 * @param {number} taskId - The ID of the task to render.
 */
function renderTaskPopUp(taskId) {
  let taskPopUpContent = document.getElementById("task_pop_up");
  taskPopUpContent.innerHTML = "";
  let task = tasks.find((t) => t.id === taskId);
  if (task) {
    let priorityImage = getPriorityImage(task.priority);
    let categoryColor = getCategoryColor(task.category);
    let assigneeContent = getAssigneesTemplate(task.assignedTo);
    taskPopUpContent.innerHTML = getTaskPopUpTemplate(task, priorityImage, categoryColor, assigneeContent);
  }
  renderSubtasks(taskId);
}

/**
 * Renders an editable popup for a task.
 * @param {number} taskId - The ID of the task to edit.
 * @param {string} priorityImage - The path to the priority image for the task.
 */
function renderEditTaskPopUp(taskId, priorityImage) {
  currentTaskId = taskId;
  let editTaskPopUpContent = document.getElementById("edit_task_pop_up");
  editTaskPopUpContent.innerHTML = "";

  let task = tasks.find((t) => t.id === taskId);
  if (task) {
    editTaskPopUpContent.innerHTML = getEditTaskPopUpTemplate(task, priorityImage);
    addedSubtasks = task.subtasks ? task.subtasks : [];
    renderAddSubtasksEditPopUp(task);
    renderSelectedContacts(task);
    setPriorityButton(task.priority);
  }
  document.getElementById("edit_task_pop_up").classList.remove("responsive-pop-up-closed");
  document.getElementById("reset_button").disabled = true;
}

/**
 * Renders the currently selected contacts in the "Edit Task" popup.
 * @param {Object} task - The task object containing the selected contacts.
 * @param {Array<Object>} task.assignedTo - An array of contacts assigned to the task.
 */
function renderSelectedContacts(task) {
  let selectedContactsContent = document.getElementById("selected_contacts");
  selectedContacts = task.assignedTo;
  selectedContactsContent.innerHTML = "";

  if (selectedContacts) {
    for (let i = 0; i < selectedContacts.length; i++) {
      let contact = selectedContacts[i];
      selectedContactsContent.innerHTML += getSelectedContactsTemplate(contact);
    }
  }
}

/**
 * Renders the initials of the assignees for a task.
 * @param {Array<Object>} assignedTo - Array of assigned contact objects.
 * @returns {string} HTML string of assignee initials.
 */
function renderAssigneeInitials(assignedTo) {
  let assigneeInitialsContent = "";
  if (Array.isArray(assignedTo)) {
    assignedTo.forEach((assignee) => {
      assigneeInitialsContent += getAssigneeInitialsTemplate(assignee);
    });
  }
  return assigneeInitialsContent;
}

/**
 * Renders the "Add Task" popup.
 */
function renderAddTaskPopUp() {
  let addTaskPopUpContent = document.getElementById("add_task_pop_up");
  addTaskPopUpContent.innerHTML = getAddTaskPopUpTemplate();
}

/**
 * Renders the subtasks of a task.
 * @param {number} taskId - The ID of the task.
 */
function renderSubtasks(taskId) {
  let subtaskContent = document.getElementById("single_subtasks");
  subtaskContent.innerHTML = "";

  let task = tasks.find((t) => t.id === taskId);
  if (task && Array.isArray(task.subtasks) && task.subtasks.length > 0) {
    task.subtasks.forEach((subtask, index) => {
      if (subtask.completed) {
        subtaskContent.innerHTML += getDoneSubtasksTemplate(taskId, subtask, index);
      } else {
        subtaskContent.innerHTML += getSubtasksTemplate(taskId, subtask, index);
      }
    });
  } else {
    subtaskContent.innerHTML = "<p>No subtasks found</p>";
  }
}

/**
 * Renders the added subtasks in the "Edit Task" popup.
 * @param {object} task - The object of the task.
 */
function renderAddSubtasksEditPopUp(task) {
  let addedSubtasksContent = document.getElementById("added_subtasks");
  addedSubtasksContent.innerHTML = "";

  addedSubtasks.forEach((addedSubtask) => {
    addedSubtasksContent.innerHTML += getAddedSubtasksTemplate(addedSubtask, task);
  });
}

/**
 * Render a string that shows how many of the Subtasks are completed.
 * @param {object} task - The object of the task.
 */
function renderProgressString(task) {
  if (task.subtasks) {
    let subTaskCount = task.subtasks.length;
    let completedSubTasks = getCompletedSubtasksCount(task);
    return `${completedSubTasks}/${subTaskCount} Subtasks Completed`;
  } else {
    return "0/0 Subtasks Completed";
  }
}

/**
 * Displays a temporary animation message on the screen with an image.
 * Starts from the bottom and slides to the middle of the screen.
 * @param {string} message - The message to display in the animation.
 * @param {string} imgSrc - The source of the image to display in the animation.
 */
function showAnimation(message, imgSrc) {
  let feedback = document.createElement("div");
  feedback.className = "feedback-animation";
  let img = document.createElement("img");
  img.src = imgSrc;
  img.alt = "Animation Icon";
  let text = document.createElement("span");
  text.innerText = message;

  feedback.appendChild(text);
  feedback.appendChild(img);

  document.body.appendChild(feedback);

  setTimeout(() => {
    feedback.remove();
  }, 3000);
}