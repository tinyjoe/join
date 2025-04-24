"use strict";

/* BOARD DATABASE */

/**
 * Fetches task data from the Firebase database, parses it, and populates the global `tasks` and `assignees` arrays. Then it calls `renderTasks()` to update the UI.
 * @async
 */
async function fetchTasksData() {
  tasks = [];
  subtasks = [];
  let tasksResponse = await fetch(BASE_URL + "/tasks" + ".json");
  let tasksToJson = await tasksResponse.json();
  if (tasksToJson) {
    const taskKeys = Object.keys(tasksToJson);
    taskKeys.forEach((key) => {
      const task = {
        id: key,
        ...tasksToJson[key],
      };
      tasks.push(task);
      if (task.assignedTo) {
        assignees.push(...task.assignedTo);
      }
    });
    renderTasks();
  }
}

/**
 * Fetches contact data from the Firebase database, parses it, and populates the global `contacts` array. Then it calls `renderTasks()` to update the UI.
 * @async
 */
async function fetchContactsData() {
  contacts = [];
  let contactsResponse = await fetch(BASE_URL + "/contacts" + ".json");
  let contactsToJson = await contactsResponse.json();
  if (contactsToJson) {
    const contactKeys = Object.keys(contactsToJson);
    contactKeys.forEach((key) => {
      contacts.push({
        id: key,
        ...contactsToJson[key],
      });
    });
  }
  renderTasks();
}

/**
 * Deletes a task from the Firebase database by its `taskId`, then refreshes the task list and closes any open pop-ups.
 * @param {string} taskId - The ID of the task to be deleted.
 * @async
 * @returns {Object} - The response from the Firebase API after deleting the task.
 */
async function deleteTaskData(taskId) {
  try {
    let taskResponse = await fetch(BASE_URL + "/tasks/" + taskId + ".json", {
      method: "DELETE",
    });
    let deletedTask = await taskResponse.json();
    await fetchTasksData();
    showAnimation("Task successfully deleted!", "../assets/img/board.png");
    closePopUps();
    return deletedTask;
  } catch (error) {
    console.error("Fehler beim Löschen des Tasks:", error);
  }
  renderTasks();
}

/**
 * Updates a task's data in Firebase, including its title, description, category, assignees, due date, priority, status, and subtasks.
 * @param {Object} task - The task object to be updated.
 * @async
 */
async function updateTaskInFirebase(task) {
  const taskId = task.id;
  const url = `${BASE_URL}/tasks/${taskId}.json`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getTaskObject(task)),
    });
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Tasks:", error);
  }
}

/**
 * Create a new task object.
 * @param {object} task - The object with the needed key value pairs of the task object.
 * @returns {JSON} - The JSON of the task object.
 */
function getTaskObject(task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    category: task.category,
    assignedTo: task.assignedTo,
    dueDate: task.dueDate,
    priority: task.priority,
    status: task.status,
    name: task.name,
    initials: task.initials,
    subtasks: task.subtasks,
  };
}