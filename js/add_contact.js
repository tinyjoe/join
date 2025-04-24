const colors = [
  "orange",
  "lila",
  "violet",
  "pink",
  "yellow",
  "turquoise",
  "darkviolet",
  "red",
  "lightblue",
  "coral",
  "blue",
  "darkblue",
];

/**
 * Show or hide the overlay of a dialog.
 */
function toggleOverlay() {
  let overlay = document.getElementById("contacts-overlay");
  overlay.classList.toggle("hidden");
}

/**
 * Show the dialog on the overlay to add a new contact.
 * @param {event} event - The event of that element.
 */
function showAddContactForm(event) {
  toggleOverlay();
  let dialog = document.getElementById("contacts-dialog");
  dialog.classList.add("show");
  dialog.innerHTML = getAddContactDialog();
  event.stopPropagation();
}

/**
 * Show the dialog on the overlay to edit an existing contact.
 * @param {event} event - The event of that element.
 * @param {string} id - The id of the contact which should be edited.
 */
async function showEditContactForm(event, id) {
  toggleOverlay();
  let dialog = document.getElementById("contacts-dialog");
  dialog.classList.add("show");
  let contact = await getContactById(id);
  dialog.innerHTML = getEditContactDialog(contact, id);
  event.stopPropagation();
}

/**
 * Close the dialog to add or edit a contact.
 * @param {event} event - The event of that element.
 */
function closeContactForm(event) {
  toggleOverlay();
  let dialog = document.getElementById("contacts-dialog");
  dialog.classList.remove("show");
  event.stopPropagation();
}

/**
 * Validate the input of the contacts email-field.
 * @param {String} keyAction - whether "add" or "edit" - the main actions of the contacts dialog
 * @returns {Boolean} - if the email has a valid form.
 */
function validateContactsEmail(keyAction) {
  const emailInput = document.getElementById(`${keyAction}-contact-mail`);
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errorMessage = document.getElementById(`${keyAction}-mail-error-message`);
  if (emailPattern.test(email)) {
    emailInput.classList.remove("error-input");
    errorMessage.classList.add("hidden");
    return true;
  } else {
    emailInput.classList.add("error-input");
    errorMessage.classList.remove("hidden");
    return false;
  }
}

/**
 * Check if input field is empty.
 * @param {String} elementId - the ID of the HTML Element.
 * @returns {Boolean} - if the input field is empty or not.
 */
function isContactInputEmpty(elementId) {
  const element = document.getElementById(elementId);
  return element.value === "";
}

/**
 * Validate all inputs of the contact dialog.
 * @param {String} keyAction - whether "add" or "edit" - the main actions of the contacts dialog
 * @returns {Boolean} - if the email has a valid form.
 */
function validAddContactInput(keyAction) {
  return (
    validateContactsEmail(keyAction) &&
    !isContactInputEmpty(`${keyAction}-contact-mail`) &&
    !isContactInputEmpty(`${keyAction}-contact-name`) &&
    !isContactInputEmpty(`${keyAction}-contact-phone`)
  );
}

/**
 * Change the color of the input border to red and show error message when an input is empty.
 * @param {String} keyAction - whether "add" or "edit" - the main actions of the contacts dialog
 */
function renderEmptyErrorName(keyAction) {
  let element = document.getElementById(`${keyAction}-contact-name`);
  if (isContactInputEmpty(`${keyAction}-contact-name`)) {
    element.classList.add("error-input");
  } else {
    element.classList.remove("error-input");
  }
}

/**
 * Change the color of the input border to red and show error message when an input is empty.
 * @param {String} keyAction - whether "add" or "edit" - the main actions of the contacts dialog
 */
function renderEmptyErrorMail(keyAction) {
  let errorMessage = document.getElementById(`${keyAction}-mail-error-message`);
  let element = document.getElementById(`${keyAction}-contact-mail`);
  if (isContactInputEmpty(`${keyAction}-contact-mail`)) {
    element.classList.add("error-input");
    errorMessage.classList.add("hidden");
  } else {
    element.classList.remove("error-input");
  }
}

/**
 * Change the color of the input border to red and show error message when an input is empty.
 * @param {String} keyAction - whether "add" or "edit" - the main actions of the contacts dialog
 */
function renderEmptyErrorPhone(keyAction) {
  if (isContactInputEmpty(`${keyAction}-contact-phone`)) {
    document
      .getElementById(`${keyAction}-contact-phone`)
      .classList.add("error-input");
  }
}

/**
 * Change the color of the input border to red and show error message when an input is empty.
 * @param {String} keyAction - whether "add" or "edit" - the main actions of the contacts dialog
 */
function renderEmptyError(keyAction) {
  renderEmptyErrorName(keyAction);
  renderEmptyErrorMail(keyAction);
  renderEmptyErrorPhone(keyAction);
  document
    .getElementById(`${keyAction}-empty-error-message`)
    .classList.remove("hidden");
}

/**
 * Change the color of the input border to red and show error message when an input is empty.
 * @param {String} keyAction - whether "add" or "edit" - the main actions of the contacts dialog
 */
function removeEmptyError(keyAction) {
  document
    .getElementById(`${keyAction}-empty-error-message`)
    .classList.add("hidden");
}

/**
 * Get all the values for creating a new contact from the given input fields.
 * @param {event} event - The event of that element.
 */
async function getNewContactsInfo(event) {
  event.preventDefault();
  let dialog = document.getElementById("contacts-dialog");
  let newContact = newContactObject();
  if (validAddContactInput("add")) {
    await createContact(newContact);
    toggleOverlay();
    dialog.classList.remove("show");
    showContactToastMessage("Contact successfully created");
    refreshContactList();
  } else {
    renderEmptyError("add");
  }
}

/**
 * Update the values of an existing contact from the given input fields.
 * @param {event} event - The event of that element.
 * @param {string} id - The id of the contact which should be updated.
 */
async function updateContactInfo(event, id) {
  event.preventDefault();
  let dialog = document.getElementById("contacts-dialog");
  let updatedContact = updatedContactObject();
  if (validAddContactInput("edit")) {
    await updateContact(updatedContact, id);
    toggleOverlay();
    dialog.classList.remove("show");
    showContactToastMessage("Contact successfully updated");
    refreshContactList();
  } else {
    renderEmptyError("edit");
  }
}

/**
 * Show toast message after successful creation, update or deletion of a new contact.
 * @param {string} toastMessage - The message that should be displayed.
 */
function showContactToastMessage(toastMessage) {
  let message = document.getElementById("add-contact-message");
  let messageText = document.getElementById("contact-toast-message");
  message.classList.add("show");
  messageText.innerHTML = toastMessage;
  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}

/**
 * Get a random color out of the colors array.
 * @returns {string} The randomly chosen color for the contact.
 */
function getRandomColor() {
  let color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}

/**
 * Return an object with the given inputs to create a contact.
 * @returns {Object} - The contact object which will be added to Firebase.
 */
function newContactObject() {
  let name = document.getElementById("add-contact-name").value;
  let mail = document.getElementById("add-contact-mail").value;
  let phone = document.getElementById("add-contact-phone").value;
  return {
    color: getRandomColor(),
    email: mail,
    initial: createInitial(name),
    name: name,
    phone: phone,
  };
}

/**
 * Return an object with the given inputs to create a contact.
 * @param {String} name - The name of the signed up user
 * @param {String} mail - The email of the signed up user
 * @returns {Object} - The contact object which will be added to Firebase.
 */
function newSignupObject(name, mail) {
  return {
    color: getRandomColor(),
    email: mail,
    initial: createInitial(name),
    name: name,
    phone: 0,
  };
}

/**
 * Return an object with the given inputs to update a contact.
 * @returns {Object} - The contact object which will be updated Firebase.
 */
function updatedContactObject() {
  let name = document.getElementById("edit-contact-name").value;
  let mail = document.getElementById("edit-contact-mail").value;
  let phone = document.getElementById("edit-contact-phone").value;
  return {
    email: mail,
    initial: createInitial(name),
    name: name,
    phone: phone,
  };
}
