const BASE_URL =
  "https://join-6838e-default-rtdb.europe-west1.firebasedatabase.app/";

let tasks = [];
let contacts = [];
let selectedContacts = [];
let subtasks = [];
let addedSubtasks = [];
let assignees = [];
let subtasksData = [];

/**
 * Create the initial out of the name of the contact or user.
 * @param {string} name - The name of the contact or user.
 */
function createInitial(name) {
  let fullName = name.split(" "),
    initials = fullName[0].substring(0, 1).toUpperCase();
  if (fullName.length > 1) {
    initials += fullName[fullName.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

/**
 * Get the currently logged in user object from local storage.
 */
function getUserFromLocalStorage() {
  let user;
  let savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser != null) {
    user = savedUser;
  }
  return user;
}

/**
 * Remove the currently logged in user object from local storage.
 */
function removeUserFromLocalStorage() {
  let user = getUserFromLocalStorage();
  console.log(user);
  localStorage.removeItem(user);
}

/**
 * Get the initial from the currently logged in user from local storage.
 */
function getInitialOfUser(profileId) {
  let user = getUserFromLocalStorage();
  let profileIcon = document.getElementById(profileId);
  profileIcon.innerHTML = user.initial;
}

/**
 * Log out the current user and remove the current user from local storage.
 */
function logOut(event) {
  event.preventDefault();
  removeUserFromLocalStorage();
  localStorage.setItem("loggedIn", JSON.stringify(false));
  window.location.href = "../pages/login.html";
}
