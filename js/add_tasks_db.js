/**
 * Clears the values of all text, number, date, email, and password inputs, as well as all textareas.
 */
function clearFormInputs() {
    const inputs = document.querySelectorAll(
        'input[type="text"], input[type="number"], input[type="date"], input[type="email"], input[type="password"]'
    );
    inputs.forEach((input) => {
        input.value = "";
    });
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
        textarea.value = "";
    });
}

/**
 * Clears all checkboxes, radio buttons, and resets dropdowns to their default state.
 */
function clearCheckboxesAndDropdowns() {
    const checkboxesAndRadios = document.querySelectorAll(
        'input[type="checkbox"], input[type="radio"]'
    );
    checkboxesAndRadios.forEach((input) => {
        input.checked = false;
    });
    const dropdowns = document.querySelectorAll("select");
    dropdowns.forEach((dropdown) => {
        dropdown.selectedIndex = 0;
    });
}

/**
 * Resets special form fields such as subtasks, category, and priority buttons.
 */
function resetSpecialFields() {
    const subtaskInput = document.getElementById("inputFieldSubtask");
    if (subtaskInput) {
        subtaskInput.value = "";
        subtaskInput.disabled = true;
    }
    const selectedCategoryElement = document.getElementById("selectedCategory");
    if (selectedCategoryElement) {
        selectedCategoryElement.textContent = "Select task category";
    }
    resetButtons();
    restorePriority();
    setTodayDate();
}

/**
 * Clears the entire form, including inputs, checkboxes, dropdowns, special fields, and selected contacts.
 */
function clearEverything() {
    clearFormInputs();
    clearCheckboxesAndDropdowns();
    resetSpecialFields();
    cancelSubtask();
    const subtaskList = document.getElementById("subtaskList");
    subtaskList.innerHTML = "";
    clearSelectedContacts();
}

/**
 * Clears the display of selected contacts and resets related fields.
 */
function clearSelectedContacts() {
    const selectedContactsElement = document.getElementById("selectedContacts");
    if (selectedContactsElement) {
        selectedContactsElement.textContent = "Select Contacts to assign";
    }
    const selectedContactsBadges = document.getElementById(
        "selectedContactsBadges"
    );
    if (selectedContactsBadges) {
        selectedContactsBadges.innerHTML = "";
    }
    const contactCheckboxes = document.querySelectorAll(".contact-checkbox");
    contactCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    selectedContacts = [];
}

/**
 * Validates the form fields and toggles the submit button based on validation results.
 */
function checkForm() {
    const title = document.getElementById("inputFieldTitle");
    const dueDate = document.getElementById("inputFieldDueDate");
    const selectedCategory = document.getElementById("selectedCategory");
    const isTitleValid = validateTitle(title);
    const isDueDateValid = validateDueDate(dueDate);
    const isCategoryValid = validateCategory(selectedCategory);
    const formIsValid = isTitleValid && isDueDateValid && isCategoryValid;
    toggleSubmitButton(formIsValid);
}

/**
 * Validates the task title input field.
 * @param {HTMLElement} title - The title input field.
 * @returns {boolean} True if the title is valid, otherwise false.
 */
function validateTitle(title) {
    if (title.value.trim() === "") {
        title.style.border = "2px solid red";
        return false;
    } else {
        title.style.border = "";
        return true;
    }
}

/**
 * Validates the due date input field.
 * @param {HTMLElement} dueDate - The due date input field.
 * @returns {boolean} True if the due date is valid, otherwise false.
 */
function validateDueDate(dueDate) {
    if (dueDate.value === "") {
        dueDate.style.border = "2px solid red";
        return false;
    } else {
        dueDate.style.border = "";
        return true;
    }
}

/**
 * Validates the selected category field.
 * @param {HTMLElement} selectedCategory - The selected category element.
 * @returns {boolean} True if the category is valid, otherwise false.
 */
function validateCategory(selectedCategory) {
    if (selectedCategory.textContent.trim() === "Select task category") {
        selectedCategory.parentElement.style.border = "2px solid red";
        return false;
    } else {
        selectedCategory.parentElement.style.border = "";
        return true;
    }
}

/**
 * Enables or disables the submit button based on form validation results.
 * @param {boolean} isFormValid - Whether the form is valid.
 */
function toggleSubmitButton(isFormValid) {
    document.getElementById("createTaskBtn").disabled = !isFormValid;
}

/**
 * Gathers all task data from the form.
 * @returns {Object} An object containing the task data.
 */
function gatherTaskData() {
    const title = document.getElementById("inputFieldTitle").value;
    const description = document.getElementById("inputFieldDescription").value;
    const dueDate = document.getElementById("inputFieldDueDate").value;
    const priority = getPriority();
    const category = document.getElementById("selectedCategory").textContent;
    return {
        title,
        description,
        dueDate,
        priority,
        category,
        subtasks: subtasksData,
        assignedTo: selectedContacts,
        status: "todo",
    };
}

/**
 * Determines the selected task priority.
 * @returns {string} The selected priority ("Urgent", "Medium", "Low", or "None").
 */
function getPriority() {
    if (document.getElementById("inputFieldUrgent").classList.contains("active-urgent")) {
        return "Urgent";
    } else if (document.getElementById("inputFieldMedium").classList.contains("active-medium")) {
        return "Medium";
    } else if (document.getElementById("inputFieldLow").classList.contains("active-low")) {
        return "Low";
    }
    return "None";
}

/**
 * Sends the task data to the API.
 * @param {Object} taskData - The task data to send.
 * @returns {Promise<boolean>} True if the task was successfully saved, otherwise false.
 */
async function sendTaskToApi(taskData) {
    try {
        const response = await fetch(`${BASE_URL}/tasks.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
        });
        return response.ok;
    } catch (error) {
        console.error("Error saving task:", error);
        return false;
    }
}

/**
 * Handles the response after attempting to create a task.
 * @param {boolean} success - Whether the task creation was successful.
 */
function handleTaskCreationResponse(success) {
    if (success) {
        const message = document.querySelector(".showMe");
        message.classList.remove("d-none");
        setTimeout(() => {
            window.location.href = "board.html";
            message.classList.add("d-none");
        }, 2900);
    } else {
        console.error("Task creation failed.");
    }
}

/**
 * Creates a task by gathering data, sending it to the API, and handling the response.
 */
async function createTask() {
    const taskData = gatherTaskData();
    const success = await sendTaskToApi(taskData);
    handleTaskCreationResponse(success);
}