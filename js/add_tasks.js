/**
 * Initializes the application by setting up the header, sidebar, and restoring default settings.
 * Displays the add-task content after a short delay.
 * @param {HTMLElement} header - The header element to be created.
 * @param {HTMLElement} sidebar - The sidebar element to be created.
 * @param {string} link - The link associated with the sidebar.
 */
function init(header, sidebar, link) {
  let addTaskContent = document.getElementById("add-task-content");
  createHeader(header);
  createSidebar(sidebar, link);
  setTimeout(() => {
    restorePriority();
    setTodayDate();
    loadAllContactsInfo();
    addTaskContent.classList.remove("hidden");
  }, 100);
}

/**
 * Sets the current date as the minimum and default value in the due date input field.
 */
function setTodayDate() {
  const dateInput = document.getElementById("inputFieldDueDate");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayString = `${year}-${month}-${day}`;
  dateInput.setAttribute("min", todayString);
  dateInput.value = todayString;
}

/**
 * Updates the selected category display and validates the form.
 * @param {string} category - The selected category name.
 */
function selectCategory(category) {
  const selectedCategoryElement = document.getElementById("selectedCategory");
  selectedCategoryElement.textContent = category;
  checkForm();
}

/**
 * Fetches a list of contact IDs from the server.
 * @returns {Promise<Array>} A list of contact IDs.
 */
async function loadContacts() {
  let contacts1 = await fetch(BASE_URL + "/contacts" + ".json");
  let contactsToJson = await contacts1.json();
  let contacts = Object.keys(contactsToJson);
  return contacts;
}

/**
 * Fetches contact details by ID from the server.
 * @param {string} id - The ID of the contact.
 * @returns {Promise<Object>} The contact details.
 */
async function getContactById(id) {
  let contactResponse = await fetch(BASE_URL + "/contacts/" + id + ".json");
  let contactToJson = await contactResponse.json();
  return contactToJson;
}

/**
 * Loads and stores details for all contacts.
 * @returns {Promise<Array>} An array of contact objects.
 */
async function loadAllContactsInfo() {
  let contactsResponse = await fetch(`${BASE_URL}/contacts.json`);
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
  return contacts;
}

/**
 * Toggles the visibility of the contact dropdown menu.
 */
function toggleContactDropdown() {
  const dropdown = document.getElementById("categoryDropdown2");
  const arrowElement = document.getElementById("dropdownArrow2");
  const dropdown1 = document.getElementById("selectOnes");
  if (dropdown.classList.contains("open")) {
    dropdown.classList.remove("open");
    arrowElement.src = "../assets/img/arrow_drop_downaa.png";
    removeOutsideClickListener();
  } else {
    dropdown.classList.add("open");
    arrowElement.src = "../assets/img/arrow_drop_up.png";
    populateDropdown(dropdown);
    addOutsideClickListener(dropdown, arrowElement, dropdown1);
  }
}

/**
 * Prevents the dropdown from closing when interacting with a specific contact.
 * @param {HTMLElement} element - The clickable element.
 * @param {HTMLElement} contactElement - The contact's DOM element.
 * @param {Object} contact - The contact data.
 */
function preventDropdownCloseOnSelect(element, contactElement, contact) {
  element.addEventListener("click", function (event) {
    event.stopPropagation();
    const checkbox = contactElement.querySelector(".contact-checkbox");
    if (event.target === checkbox) {
      handleContactSelection(contactElement, contact, checkbox.checked);
    } else {
      checkbox.checked = !checkbox.checked;
      handleContactSelection(contactElement, contact, checkbox.checked);
    }
  });
}

/**
 * Handles the selection or deselection of a contact.
 * @param {HTMLElement} contactElement - The contact's DOM element.
 * @param {Object} contact - The contact data.
 * @param {boolean} isChecked - Whether the contact is selected.
 */
function handleContactSelection(contactElement, contact, isChecked) {
  const checkbox = contactElement.querySelector(".contact-checkbox");
  checkbox.checked = isChecked;
  if (isChecked) {
    if (!isSelected(contact.name)) {
      selectedContacts.push(contact);
    }
  } else {
    selectedContacts = selectedContacts.filter((c) => c.name !== contact.name);
  }
  contactElement.classList.toggle("selected", isChecked);
  updateSelectedContactsDisplay();
}

/**
 * Populates the dropdown menu with contact items.
 * @param {HTMLElement} dropdown - The dropdown menu element.
 */
function populateDropdown(dropdown) {
  dropdown.innerHTML = "";
  contacts.forEach((contact) => {
    const contactElement = document.createElement("div");
    contactElement.classList.add("contact-item");
    if (isSelected(contact.name)) contactElement.classList.add("selected");
    contactElement.innerHTML = createContactHTML(
      contact,
      isSelected(contact.name)
    );
    const checkbox = contactElement.querySelector(".contact-checkbox");
    preventDropdownCloseOnSelect(checkbox, contactElement, contact);
    preventDropdownCloseOnSelect(contactElement, contactElement, contact);
    dropdown.appendChild(contactElement);
  });
}

/**
 * Adds a listener to close the dropdown if clicking outside of it.
 * @param {HTMLElement} dropdown - The dropdown menu.
 * @param {HTMLElement} arrowElement - The dropdown arrow icon.
 * @param {HTMLElement} dropdown1 - Another related element to check for clicks.
 */
function addOutsideClickListener(dropdown, arrowElement, dropdown1) {
  function handleClickOutside(event) {
    if (!dropdown.contains(event.target) && !dropdown1.contains(event.target)) {
      dropdown.classList.remove("open");
      arrowElement.src = "../assets/img/arrow_drop_downaa.png";
      removeOutsideClickListener();
    }
  }
  document.addEventListener("click", handleClickOutside);
  dropdown.setAttribute("data-listener", handleClickOutside);
}

/**
 * Removes the click listener that closes the dropdown.
 */
function removeOutsideClickListener() {
  const dropdown = document.getElementById("categoryDropdown2");
  const listener = dropdown.getAttribute("data-listener");
  if (listener) {
    dropdown.removeAttribute("data-listener");
  }
}

/**
 * Toggles the selection state of a contact.
 * @param {Object} contact - The contact data.
 */
function toggleContactSelection(contact) {
  if (isSelected(contact.name)) {
    selectedContacts = selectedContacts.filter((c) => c.name !== contact.name);
  } else {
    selectedContacts.push(contact);
  }
  updateSelectedContactsDisplay();
}

/**
 * Checks if a contact is already selected.
 * @param {string} contactName - The name of the contact.
 * @returns {boolean} True if the contact is selected, otherwise false.
 */
function isSelected(contactName) {
  return selectedContacts.some((contact) => contact.name === contactName);
}

/**
 * Updates the display of selected contacts and their badges.
 */
function updateSelectedContactsDisplay() {
  const badgesContainer = document.getElementById("selectedContactsBadges");
  const maxContactsContainer = document.querySelector(".maxContacts");
  badgesContainer.innerHTML = "";
  maxContactsContainer.innerHTML = "";
  if (selectedContacts.length === 0) return;
  const contactsToShow = selectedContacts.slice(0, 5);
  contactsToShow.forEach((contact) => {
    const badge = createContactBadge(contact);
    badgesContainer.appendChild(badge);
  });
  if (selectedContacts.length > 5) {
    const remainingCount = selectedContacts.length - 5;
    const remainingBadge = createRemainingBadge(remainingCount);
    maxContactsContainer.appendChild(remainingBadge);
  }
}

/**
 * Creates a badge element for a contact.
 * @param {Object} contact - The contact data.
 * @returns {HTMLElement} The badge element.
 */
function createContactBadge(contact) {
  const badge = document.createElement("div");
  badge.classList.add("contact-badge", `bg-${contact.color}`);
  badge.textContent = contact.initial;
  return badge;
}

/**
 * Creates a badge indicating the number of additional contacts.
 * @param {number} count - The number of additional contacts.
 * @returns {HTMLElement} The badge element.
 */
function createRemainingBadge(count) {
  const badge = document.createElement("div");
  badge.classList.add("contact-badge", "remaining-contacts-badge");
  badge.textContent = `+${count}`;
  return badge;
}

/**
 * Toggles the visibility of a dropdown menu.
 */
function toggleDropdown() {
  const dropdown = document.getElementById("categoryDropdown");
  const dropdown2 = document.getElementById("selectCat");
  const arrowElement = document.getElementById("dropdownArrow");
  if (dropdown.classList.contains("open")) {
    dropdown.classList.remove("open");
    arrowElement.src = "../assets/img/arrow_drop_downaa.png";
    removeOutsideClickListener();
  } else {
    dropdown.classList.add("open");
    arrowElement.src = "../assets/img/arrow_drop_up.png";
    addOutsideClickListener(dropdown, arrowElement, dropdown2);
  }
}

/**
 * Resets the styling and images of priority buttons.
 */
function resetButtons() {
  const buttons = document.querySelectorAll(".priobtn");
  buttons.forEach((btn) => {
    btn.classList.remove("active-urgent", "active-medium", "active-low");
    const img = btn.querySelector("img");
    if (btn.innerText.includes("Urgent")) {
      img.src = "../assets/img/urgent.png";
    } else if (btn.innerText.includes("Medium")) {
      img.src = "../assets/img/medium21.png";
    } else if (btn.innerText.includes("Low")) {
      img.src = "../assets/img/low.png";
    }
  });
}

/**
 * Sets the selected priority and updates the corresponding button's styling.
 * @param {HTMLElement} button - The priority button element.
 * @param {string} priority - The selected priority ("urgent", "medium", or "low").
 */
function setPriority(button, priority) {
  resetButtons();
  const img = button.querySelector("img");
  if (priority === "urgent") {
    button.classList.add("active-urgent");
    img.src = "../assets/img/urgent21.png";
  } else if (priority === "medium") {
    button.classList.add("active-medium");
    img.src = "../assets/img/medium.png";
  } else if (priority === "low") {
    button.classList.add("active-low");
    img.src = "../assets/img/low21.png";
  }
  localStorage.setItem("selectedPriority", priority);
}

/**
 * Restores the default priority selection.
 */
function restorePriority() {
  const mediumPriorityBtn = document.querySelector(".urgMedLow-btn-medium");
  setPriority(mediumPriorityBtn, "medium");
}
