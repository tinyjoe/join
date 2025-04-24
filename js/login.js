let isVisible = false;
let isRememberOn = false;

/**
 * Start animation based on device width.
 */
function animateIntro() {
  if (window.innerWidth > 700) {
    introAnimationDesktop();
  } else {
    introAnimationMobile();
  }
}

/**
 * Fill the input field with the remembered user information
 */
function rememberUser() {
  let user = getUserFromLocalStorage();
  let remember = JSON.parse(localStorage.getItem("rememberMe"));
  let password = document.getElementById("login-password");
  let mail = document.getElementById("login-mail");
  if (remember) {
    mail.value = user.email;
    password.value = user.password;
  }
}

/**
 * Create animation for desktop view.
 */
function introAnimationDesktop() {
  const logo = document.getElementById("intro-logo");
  logo.addEventListener("animationend", (event) => {
    if (event.animationName === "fadeOut") {
      window.location.href = "../pages/login.html";
    }
  });
}

/**
 * Create animation for mobile view.
 */
function introAnimationMobile() {
  const mobileLogo = document.getElementById("intro-mobile-logo");
  mobileLogo.addEventListener("animationend", (event) => {
    if (event.animationName === "fadeOut") {
      window.location.href = "../pages/login.html";
    }
  });
}

/**
 * Show or hide password input.
 * Change visibility icon accordingly.
 * @param {string} iconId - The id of the icon.
 * @param {string} passwordId - The id of password input.
 */
function showPassword(iconId, passwordId) {
  let passwordIcon = document.getElementById(iconId);
  let password = document.getElementById(passwordId);
  isVisible = !isVisible;
  if (isVisible) {
    passwordIcon.src = "../assets/icons/visibility.svg";
    password.type = "text";
  } else {
    passwordIcon.src = "../assets/icons/visibility_off.svg";
    password.type = "password";
  }
}

/**
 * Show visibility icon.
 * @param {string} iconId - The id of the icon.
 */
function showVisibilityIcon(iconId) {
  let passwordIcon = document.getElementById(iconId);
  passwordIcon.src = "../assets/icons/visibility_off.svg";
}

/**
 * Check the checkbox for Remember Me.
 */
function checkRememberMe() {
  let checkbox = document.getElementById("remember-checkbox");
  let checkboxHover = document.getElementById("remember-checkbox-hover");
  isRememberOn = !isRememberOn;
  if (isRememberOn) {
    checkbox.src = "../assets/icons/checked.svg";
    checkboxHover.src = "../assets/icons/hover_checked.svg";
    localStorage.setItem("rememberMe", JSON.stringify(true));
  } else {
    checkbox.src = "../assets/icons/default.svg";
    checkboxHover.src = "../assets/icons/hover_default.svg";
    localStorage.setItem("rememberMe", JSON.stringify(false));
  }
}

/**
 * Check if there is a user with the given inputs.
 * @param {string} mail - The mail of the login input.
 * @param {string} password - The password of the login input.
 * @returns {Boolean} - if password and email are valid inputs.
 */
async function findUser(mail, password) {
  let userList = await loadAllUsersInfo();
  let validMail = userList.some((user) => user.email === mail);
  let validPassword = userList.some((user) => user.password === password);
  return validMail && validPassword;
}

/**
 * Find a valid user with the given inputs.
 * Returns user object.
 * @param {string} mail - The mail of the login input.
 * @param {string} password - The password of the login input.
 * @returns {Boolean} - if there is a user with the given email and password.
 */
async function getValidUser(mail, password) {
  let users = await loadAllUsersInfo();
  let validUser = users.find(
    (u) => u.email === mail && u.password === password
  );
  return validUser;
}

/**
 * Save the valid user to local storage.
 * @param {string} mail - The mail of the login input.
 * @param {string} password - The password of the login input.
 */
async function saveContactToLocalStorage(mail, password) {
  let user = await getValidUser(mail, password);
  let users = await loadAllUsersInfo();
  let loggedContact = users.find(
    (c) => c.email === user.email && c.password === user.password
  );
  localStorage.setItem("user", JSON.stringify(loggedContact));
  localStorage.setItem("loggedIn", JSON.stringify(true));
  localStorage.setItem("rememberMe", JSON.stringify(isRememberOn));
}

/**
 * Validate the login inputs and if user exists, navigates to summary.
 * If not, show error under input fields.
 * @param {event} event - The event of that element.
 */
async function isValidCredential(event) {
  event.preventDefault();
  let password = document.getElementById("login-password");
  let mail = document.getElementById("login-mail");
  let error = document.getElementById("login-error-message");
  let userExists = await findUser(mail.value, password.value);
  if (userExists && validateLoginEmail()) {
    await saveContactToLocalStorage(mail.value, password.value);
    window.location.href = "../pages/summary.html";
  } else {
    mail.classList.add("error-input");
    password.classList.add("error-input");
    error.classList.remove("hidden");
  }
}

/**
 * Login as guest when the guest button is clicked and navigate to summary.
 * The initial is automatically set to "G".
 */
function loginAsGuest() {
  localStorage.setItem("user", JSON.stringify({ name: "Guest", initial: "G" }));
  localStorage.setItem("loggedIn", JSON.stringify(true));
  localStorage.setItem("rememberMe", JSON.stringify(false));
  window.location.href = "../pages/summary.html";
}

/**
 * Validate the input of the login email-field.
 * @returns {Boolean} - if the email has a valid form.
 */
function validateLoginEmail() {
  const emailInput = document.getElementById("login-mail");
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errorMessage = document.getElementById("login-mail-error");
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
 * Navigate to the legal pages and show the content which is available for not logged in users.
 * @param {String} path - The url to the HTML page.
 */
function navigateToLegalLoggedOut(path) {
  localStorage.setItem("loggedIn", JSON.stringify(false));
  window.location.href = path;
}
