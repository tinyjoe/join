let isPrivacyChecked = false;

/**
 * Check if privacy policy checkbox is checked
 * Render the symbol accordingly
 */
function checkPrivacyPolicy() {
  let checkbox = document.getElementById("privacy-checkbox");
  let checkboxHover = document.getElementById("privacy-checkbox-hover");
  isPrivacyChecked = !isPrivacyChecked;
  if (isPrivacyChecked) {
    checkbox.src = "../assets/icons/checked.svg";
    checkboxHover.src = "../assets/icons/hover_checked.svg";
  } else {
    checkbox.src = "../assets/icons/default.svg";
    checkboxHover.src = "../assets/icons/hover_default.svg";
  }
}

/**
 * Check if any input field is empty
 * @returns {Boolean} - if one of the input fields are empty.
 */
function isInputEmpty() {
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-mail").value;
  let password = document.getElementById("signup-password").value;
  let passwordConfirm = document.getElementById(
    "signup-password-confirm"
  ).value;
  return name != "" && email != "" && password != "" && passwordConfirm != "";
}

/**
 * Check if both password inputs are the same
 * @returns {Boolean} - if passwords are the same.
 */
function isPasswordSame() {
  let password = document.getElementById("signup-password");
  let passwordConfirm = document.getElementById("signup-password-confirm");
  let error = document.getElementById("signup-error-message");
  if (password.value !== passwordConfirm.value) {
    passwordConfirm.classList.add("error-input");
    error.classList.remove("hidden");
    return false;
  } else {
    passwordConfirm.classList.remove("error-input");
    error.classList.add("hidden");
    return true;
  }
}

/**
 * Validate the input of the signup email-field.
 * @returns {Boolean} - if the email has a valid form.
 */
function validateSignupEmail() {
  const emailInput = document.getElementById("signup-mail");
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errorMessage = document.getElementById("signup-mail-error");
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
 * Validate input
 * @returns {Boolean} - if privacy is checked, all inputs are given and the passwords are the same.
 */
function validateInput() {
  return (
    isPrivacyChecked &&
    isInputEmpty() &&
    isPasswordSame() &&
    validateSignupEmail()
  );
}

/**
 * Show toast message after successful signup
 * @param {string} url - The url to navigate to the login page.
 */
function showSignupSuccessMessage(url) {
  let message = document.getElementById("signup-message");
  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
    window.location.href = url;
  }, 3000);
}

/**
 * Sign up new user and create contact out of user data.
 * Reset form after that.
 * @param {event} event - The event of that element.
 */
async function signUpUser(event) {
  event.preventDefault();
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-mail").value;
  let password = document.getElementById("signup-password").value;
  let newUser = newUserObject(name, email, password);
  let newContact = newSignupObject(name, email);
  await createUser(newUser);
  await createContact(newContact);
  resetForm();
}

/**
 * Validate all inputs and checkboxes.
 * Either signup user or show alert.
 * @param {event} event - The event of that element.
 * @param {string} url - The url to navigate to the login page.
 */
async function validateAndSignupUser(event, url) {
  if (validateInput()) {
    await signUpUser(event);
    showSignupSuccessMessage(url);
  } else {
    alert("You have to fill out all the fields and accept the privacy policy");
  }
}

/**
 * Reset form and clear all inputs.
 */
function resetForm() {
  let form = document.getElementById("signup-form");
  form.reset();
  isPrivacyChecked = false;
}

/**
 * Return an object with the given inputs to create a user.
 * @param {string} name - The name of the user.
 * @param {string} mail - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Object} - The user object which will be added to Firebase.
 */
function newUserObject(name, mail, password) {
  return {
    email: mail,
    name: name,
    password: password,
    initial: createInitial(name),
  };
}
