/**
 * Initializes the subtask input field and its associated icons.
 * Enables the input field, focuses it, and sets the action icon.
 * Adds a close icon if it doesn't already exist.
 * @returns {Object} Contains references to the input field and the action icon.
 */
function initializeSubtaskInput() {
  const inputField = document.getElementById("inputFieldSubtask");
  const iconWrapper = document.getElementById("iconWrapper");
  const actionIcon = document.getElementById("actionIcon");
  inputField.disabled = false;
  inputField.focus();
  actionIcon.src = "../assets/img/Propertycheck.png";
  if (!document.getElementById("closeIcon")) {
    iconWrapper.insertAdjacentHTML("afterbegin", createCloseIconHTML());
  }
  return { inputField, actionIcon };
}

/**
 * Generates a unique ID.
 * @returns {string} A unique identifier string.
 */
function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

/**
 * Return an object with the given inputs to create a subtask.
 * @param {String} name - The name of the subtask
 * @returns {Object} - The subtask object which will be added to Firebase.
 */
function newSubtaskObject(name) {
  return {
    id: generateUniqueId(),
    name: name,
    completed: false,
  };
}

/**
 * Handles the addition of a new subtask.
 * Adds the subtask to the list and resets the input field for further use.
 * @param {HTMLElement} inputField - The input field for subtasks.
 * @param {HTMLElement} actionIcon - The action icon to trigger subtask addition.
 */
function handleSubtaskAddition(inputField, actionIcon) {
  actionIcon.onclick = function () {
    const subtaskText = inputField.value.trim();
    if (subtaskText !== "") {
      const subtaskList = document.getElementById("subtaskList");
      subtaskList.insertAdjacentHTML(
        "beforeend",
        createSubtaskHTML(subtaskText)
      );
      subtasksData.push(newSubtaskObject(subtaskText));
      inputField.value = "";
      inputField.focus();
    }
  };
}

/**
 * Adds a new subtask by initializing the input field and handling the addition logic.
 */
function addSubtask() {
  const { inputField, actionIcon } = initializeSubtaskInput();
  handleSubtaskAddition(inputField, actionIcon);
}

/**
 * Cancels the subtask addition process.
 * Resets the input field, removes the close icon, and restores the default action icon.
 */
function cancelSubtask() {
  const inputField = document.getElementById("inputFieldSubtask");
  const iconWrapper = document.getElementById("iconWrapper");
  const actionIcon = document.getElementById("actionIcon");
  inputField.disabled = true;
  inputField.value = "";
  actionIcon.src = "../assets/img/Propertyadd.png";
  const closeIcon = document.getElementById("closeIcon");
  if (closeIcon) {
    iconWrapper.removeChild(closeIcon);
  }
  actionIcon.onclick = addSubtask;
}

/**
 * Edits an existing subtask by replacing its text with an input field.
 * Provides icons for confirming or canceling the edit and handles input events.
 * @param {HTMLElement} subtaskItem - The subtask item to be edited.
 */
function editSubtask(subtaskItem) {
  const textElement = subtaskItem.querySelector(".subtask-text");
  const currentText = textElement.textContent.trim();
  subtaskItem.classList.add("editing");
  textElement.outerHTML = createSubtaskInputHTML(
    currentText,
    subtaskItem.offsetHeight
  );
  const iconsWrapper = subtaskItem.querySelector(".subtask-icons");
  iconsWrapper.innerHTML = createEditingIconsHTML();
  const input = subtaskItem.querySelector(".subtaskInput");
  input.focus();
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      finishEditing(input, textElement, subtaskItem);
    }
  });
  input.addEventListener("blur", function () {
    finishEditing(input, textElement, subtaskItem);
  });
}

/**
 * Listens for checkbox clicks and logs the associated contact name.
 */
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("contact-checkbox")) {
    console.log("Checkbox clicked:", event.target.dataset.name);
  }
});

/**
 * Completes the editing process for a subtask.
 * Updates the subtask's text and data, and restores the default icons.
 * @param {HTMLElement} input - The input field used for editing.
 * @param {HTMLElement} textElement - The original text element of the subtask.
 * @param {HTMLElement} subtaskItem - The subtask item being edited.
 */
function finishEditing(input, textElement, subtaskItem) {
  const newText = input.value.trim();
  textElement.textContent = newText !== "" ? newText : input.value;
  input.replaceWith(textElement);
  subtaskItem.classList.remove("editing");
  const subtask = subtasksData.find(
    (sub) => sub.name === textElement.textContent
  );
  if (subtask) {
    subtask.name = newText;
  }
  const iconsWrapper = subtaskItem.querySelector(".subtask-icons");
  iconsWrapper.innerHTML = createDefaultIconsHTML();
}

/**
 * Deletes a subtask from the list.
 * @param {HTMLElement} subtaskItem - The subtask item to be deleted.
 */
function deleteSubtask(subtaskItem) {
  subtaskItem.remove();
}
