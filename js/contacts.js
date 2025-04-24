let groupedContacts = {};
let editMenuShown = false;
let activeContact = null;

/**
 * Load header and sidebar dynamically.
 * Show content after loading header and sidebar
 * @param {string} header - The id of header container.
 * @param {string} sidebar - The id of sidebar container.
 * @param {string} link - The id of navigation item that will be focused.
 */
function initContacts(header, sidebar, link) {
  let contactContent = document.getElementById("contact-content");
  createHeader(header);
  createSidebar(sidebar, link);
  loadContactList();
  setTimeout(() => {
    contactContent.classList.remove("hidden");
  }, 100);
}

/**
 * Show the detail information of the selected contact.
 * @param {event} event - The event of that element.
 * @param {string} id - The id of the selected contact.
 */
async function showContactInfo(event, id) {
  let contact = await getContactById(id);
  if (window.innerWidth > 800) {
    triggerListItemBackground(event);
    let contactInfo = document.getElementById("contacts-info");
    contactInfo.innerHTML = "";
    contactInfo.innerHTML += getContactInfoTemplate(contact, id);
  } else {
    showMobileInfoDialog(contact, id);
  }
}

/**
 * Change the background of the contact list item when it is clicked.
 * When other list item is clicked, change it back to default.
 * @param {event} event - The event of that element.
 */
function triggerListItemBackground(event) {
  const target = event.target;
  if (target) {
    if (target.tagName === "BUTTON") {
      if (activeContact) {
        activeContact.classList.remove("contact-active");
      }
      activeContact = target;
      activeContact.classList.add("contact-active");
    }
  }
}

/**
 * Show the detail information of the selected contact for mobile view.
 * @param {event} event - The event of that element.
 * @param {string} id - The id of the selected contact.
 */
function showMobileInfoDialog(contact, id) {
  let mobileInfo = document.getElementById("mobile-contacts-dialog");
  let contactList = document.getElementById("contacts-list-container");
  mobileInfo.classList.remove("hidden");
  contactList.classList.add("hidden");
  mobileInfo.innerHTML = "";
  mobileInfo.innerHTML = renderMobileInfoSection(contact, id);
}

/**
 * Close the detail information of the selected contact for mobile view.
 */
function closeMobileInfoDialog() {
  let mobileInfo = document.getElementById("mobile-contacts-dialog");
  let contactList = document.getElementById("contacts-list-container");
  mobileInfo.classList.add("hidden");
  contactList.classList.remove("hidden");
}

/**
 * Load a grouped list of all contacts.
 */
async function loadContactList() {
  getInitialOfUser("contact-profile-icon");
  let contactsArray = await loadAllContactsInfo();
  groupContacts(contactsArray);
  loadGroupedContactList();
}

/**
 * Refresh the list of contacts from Firebase.
 */
async function refreshContactList() {
  let contactList = document.getElementById("contact-list");
  let contactInfo = document.getElementById("contacts-info");
  contactList.innerHTML = "";
  contactInfo.innerHTML = "";
  await loadContactList();
}

/**
 * Delete a contact and refresh the contact list from Firebase after that.
 * @param {string} id - The id of the contact that should be deleted.
 */
async function deleteAndRefreshContactList(id) {
  let contactList = document.getElementById("contact-list");
  let contactInfo = document.getElementById("contacts-info");
  await deleteContact(id);
  showContactToastMessage("Contact successfully deleted");
  contactList.innerHTML = "";
  contactInfo.innerHTML = "";
  await loadContactList();
}

/**
 * Delete a contact and refresh the contact list from Firebase after that for mobile view.
 * @param {string} id - The id of the contact that should be deleted.
 */
async function deleteAndRefreshContactListMobile(id) {
  let contactList = document.getElementById("contact-list");
  await deleteContact(id);
  showContactToastMessage("Contact successfully deleted");
  contactList.innerHTML = "";
  closeMobileInfoDialog();
  await loadContactList();
}

/**
 * Group the contact list alphabetically.
 * @param {string} arrayName - The name of the array that should be grouped.
 * @returns {Object} The object of the grouped contact list.
 */
function groupContacts(arrayName) {
  groupedContacts = [];
  arrayName.forEach((contact) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!groupedContacts[firstLetter]) {
      groupedContacts[firstLetter] = [];
    }
    groupedContacts[firstLetter].push(contact);
  });
}

/**
 * Sort the grouped contact list alphabetically with section headers.
 */
function loadGroupedContactList() {
  let contactList = document.getElementById("contact-list");
  for (i = 65; i <= 90; i++) {
    let letter = String.fromCharCode(i);
    if (typeof groupedContacts[letter] !== "undefined") {
      contactList.innerHTML += getContactListHeaderTemplate(letter);
      loadContactListItems(groupedContacts[letter]);
    }
  }
}

/**
 * Load contact list and show it in list items.
 * @param {string} arrayName - The name of the array that should be loaded.
 */
function loadContactListItems(arrayName) {
  let contactList = document.getElementById("contact-list");
  for (let i = 0; i < arrayName.length; i++) {
    const contact = arrayName[i];
    contactList.innerHTML += getContactListItemTemplate(contact, contact.id);
  }
}

/**
 * Show Floating Action Button to edit a contact in mobile view.
 * @param {string} id - The id of the contact that should be edited.
 */
function showMobileEditMenu(id) {
  let editMenu = document.getElementById("edit-menu");
  if (editMenuShown) {
    editMenu.innerHTML = "";
  } else {
    editMenu.innerHTML = renderMobileEditMenu(id);
  }
  editMenuShown = !editMenuShown;
}
