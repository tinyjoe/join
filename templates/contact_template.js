/**
 * Render the template of the dialog to add a contact.
 * @returns {string} The HTML structure of the add contact dialog.
 */
function getAddContactDialog() {
  return `<div class="contacts-overlay-header">
            <div class="contacts-close hide-desktop">
              <img
                src="../assets/icons/close_white.svg"
                onclick="closeContactForm(event)"
              />
            </div>
            <div class="overlay-header-content">
          <img class="hide-mobile" src="../assets/img/join_logo_white.svg" />
          <h2>Add contact</h2>
          <h4>Tasks are better with a team!</h4>
          <hr /></div>
        </div>
        <div class="contacts-overlay-info">
          <div class="contacts-close hide-mobile">
            <img
              src="../assets/icons/close.svg"
              onclick="closeContactForm(event)"
            />
          </div>
          <div class="add-contact-section">
            <div id="add-contact-icon" class="profile-icon-big bg-grey"><img src="../assets/icons/person.svg" /></div>
            <form id="add-contacts-form" class="add-contacts-form">
              <div class="icon-input-field">
                <input id="add-contact-name" type="text" placeholder="Name" required onkeyup="renderEmptyErrorName('add')"/>
                <img class="input-icon" src="../assets/icons/person-grey.svg" />
              </div>
              <div>
              <div class="icon-input-field">
                <input id="add-contact-mail" type="email" placeholder="Email" onkeyup="validateContactsEmail('add')" required/>
                <img class="input-icon" src="../assets/icons/mail-grey.svg" />
              </div>
              <p id="add-mail-error-message" class="error-text hidden">
              Please enter a valid email address.
              </p>
              </div>
              <div class="icon-input-field">
                <input id="add-contact-phone" placeholder="Phone" type="number" required onkeyup="renderEmptyErrorPhone('add')"/>
                <img class="input-icon" src="../assets/icons/call-grey.svg" />
              </div>
              <div class="add-contact-buttons">
                <button
                  class="contact-form-btn btn-outline hide-mobile"
                  onclick="closeContactForm(event)"
                >
                  <p>Cancel</p>
                  <img class="default-icon" src="../assets/icons/close.svg" />
                  <img class="hover-icon" src="../assets/icons/iconoir_cancel.svg" />
                </button>
                <button
                  type="submit"
                  id="add-contact-btn"
                  class="contact-form-btn btn-filled"
                  onclick="getNewContactsInfo(event)"
                >
                  <p>Create Contact</p>
                  <img src="../assets/icons/check.svg" />
                </button>
              </div>
            </form>
          </div>
          <p id="add-empty-error-message" class="error-text hidden" style="margin: 30px 60px 0px 0px">
              All fields need to be filled.
              </p>`;
}

/**
 * Render the template of the dialog to edit a contact.
 * @param {object} contact - The data object of the selected contact.
 * @param {string} id - The id of the selected contact.
 * @returns {string} The HTML structure of the edit contact dialog.
 */
function getEditContactDialog(contact, id) {
  return `<div class="contacts-overlay-header">
          <div class="contacts-close hide-desktop">
              <img
                src="../assets/icons/close_white.svg"
                onclick="closeContactForm(event)"
              />
            </div>
            <div class="overlay-header-content">
          <img class="hide-mobile" src="../assets/img/join_logo_white.svg" />
          <h2>Edit contact</h2>
          <hr /></div>
        </div>
        <div class="contacts-overlay-info">
          <div class="contacts-close hide-mobile">
            <img
              src="../assets/icons/close.svg"
              onclick="closeContactForm(event)"
            />
          </div>
          <div class="add-contact-section">
            <div class="profile-icon-big bg-${contact.color}">${contact.initial}</div>
            <form class="add-contacts-form">
              <div class="icon-input-field">
                <input id="edit-contact-name" type="text" placeholder="Name" value="${contact.name}" onkeyup="renderEmptyErrorName('edit')"/>
                <img class="input-icon" src="../assets/icons/person-grey.svg" />
              </div>
              <div>
              <div class="icon-input-field">
                <input id="edit-contact-mail" type="email" placeholder="Email" value="${contact.email}" onkeyup="validateContactsEmail('edit')"/>
                <img class="input-icon" src="../assets/icons/mail-grey.svg" />
              </div>
              <p id="edit-mail-error-message" class="error-text hidden">
              Please enter a valid email address.
              </p>
              </div>
              <div class="icon-input-field">
                <input id="edit-contact-phone" placeholder="Phone" type="number" value="${contact.phone}" onkeyup="renderEmptyErrorPhone('edit')"/>
                <img class="input-icon" src="../assets/icons/call-grey.svg" />
              </div>
              <div class="add-contact-buttons">
                <button
                  class="contact-form-btn btn-outline"
                  onclick="closeContactForm(event)"
                >
                  <p>Cancel</p>
                  <img class="default-icon" src="../assets/icons/close.svg" />
                  <img class="hover-icon" src="../assets/icons/iconoir_cancel.svg" />
                </button>
                <button
                type="submit"
                  id="edit-contact-btn"
                  class="contact-form-btn btn-filled"
                  onclick="updateContactInfo(event, '${id}')"
                >
                  <p>Save</p>
                  <img src="../assets/icons/check.svg" />
                </button>
              </div>
            </form>
          </div>
          <p id="edit-empty-error-message" class="error-text hidden" style="margin: 30px 60px 0px 0px">
              All fields need to be filled.
              </p>`;
}

/**
 * Render the template of the detailed information of a selected contact.
 * @param {object} contact - The data object of the selected contact.
 * @param {string} id - The id of the selected contact.
 * @returns {string} The HTML structure of the detailed information of a contact.
 */
function getContactInfoTemplate(contact, id) {
  return `<div class="contacts-name">
              <div id="contact-initial" class="profile-icon-big bg-${contact.color}">${contact.initial}</div>
              <div id="contact-name" class="name-container">
                <h3>${contact.name}</h3>
                <div class="contacts-btn-row hide-on-mobile">
                  <div
                    id="btn-contact-edit"
                    class="text-button"
                    onclick="showEditContactForm(event, '${id}')"
                  >
                    <img class="default-icon" src="../assets/icons/edit.svg" />
                    <img class="hover-icon" src="../assets/icons/edit_blue.svg" />
                    <p>Edit</p>
                  </div>
                  <div id="btn-contact-delete" class="text-button" onclick="deleteAndRefreshContactList('${id}')">
                    <img class="default-icon" src="../assets/icons/delete.svg" />
                    <img class="hover-icon" src="../assets/icons/delete_blue.svg" />
                    <p>Delete</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="contacts-info-hl">
              <h4>Contact Information</h4>
            </div>
            <div class="contacts-info-content">
              <p class="label">Email</p>
              <p id="contact-mail" class="copy-mail">${contact.email}</p>
              <p class="label">Phone</p>
              <p id="contact-phone" class="copy-text">${contact.phone}</p>
            </div>`;
}

/**
 * Render the template of the alphabetical section header of the contact list.
 * @param {string} letter - The letter of the alphabet.
 * @returns {string} The HTML structure of the section header of the contact list.
 */
function getContactListHeaderTemplate(letter) {
  return `<div id="section-header" class="section-header">
              <p class="contacts-info-hl section-letter">${letter}</p>
              <hr />
            </div>`;
}

/**
 * Render the template of a contact list item.
 * @param {object} contact - The data object of the selected contact.
 * @param {string} id - The id of the selected contact.
 * @returns {string} The HTML structure of the list item of the contact list.
 */
function getContactListItemTemplate(contact, id) {
  return `<button
              id="contact-item"
              class="contact-list-item"
              onclick="showContactInfo(event, '${id}')"
            >
              <div id="list-initial" class="profile-icon-small bg-${contact.color}">${contact.initial}</div>
              <div class="contact-list-info">
                <p id="list-name" class="contacts-info-hl">${contact.name}</p>
                <p id="list-mail" class="copy-mail">${contact.email}</p>
              </div>
            </button>`;
}

/**
 * Render the template of the edit menu in mobile view.
 * @param {string} id - The id of the selected contact.
 * @returns {string} The HTML structure of the popup menu to edit a contact in mobile view.
 */
function renderMobileEditMenu(id) {
  return `<div class="edit-menu-container">
                <div
                    id="btn-contact-edit"
                    class="text-button"
                    onclick="showEditContactForm(event, '${id}')"
                  >
                    <img class="default-icon" src="../assets/icons/edit.svg" />
                    <img class="hover-icon" src="../assets/icons/edit_blue.svg" />
                    <p>Edit</p>
                  </div>
                  <div id="btn-contact-delete" class="text-button" onclick="deleteAndRefreshContactListMobile('${id}')">
                    <img class="default-icon" src="../assets/icons/delete.svg" />
                    <img class="hover-icon" src="../assets/icons/delete_blue.svg" />
                    <p>Delete</p>
                  </div>
              </div>`;
}

/**
 * Render the template of the detailed information of a selected contact in mobile view.
 * @param {object} contact - The data object of the selected contact.
 * @param {string} id - The id of the selected contact.
 * @returns {string} The HTML structure of the detailed information of a contact in mobile view.
 */
function renderMobileInfoSection(contact, id) {
  return `<div class="mobile-contacts-header">
            <div class="contacts-headline">
              <h2>Contacts</h2>
              <div class="vl"></div>
              <p>Better with a team</p>
            </div>
            <img
              src="../assets/icons/arrow-left-line.svg"
              onclick="closeMobileInfoDialog()"
            />
          </div>
          <div class="contacts-name">
              <div id="contact-initial" class="profile-icon-big bg-${contact.color}">${contact.initial}</div>
              <div id="contact-name" class="name-container">
                <h3>${contact.name}</h3>
                <div class="contacts-btn-row hide-mobile">
                  <div
                    id="btn-contact-edit"
                    class="text-button"
                    onclick="showEditContactForm(event, '${id}')"
                  >
                    <img class="default-icon" src="../assets/icons/edit.svg" />
                    <img class="hover-icon" src="../assets/icons/edit_blue.svg" />
                    <p>Edit</p>
                  </div>
                  <div id="btn-contact-delete" class="text-button" onclick="deleteAndRefreshContactList('${id}')">
                    <img class="default-icon" src="../assets/icons/delete.svg" />
                    <img class="hover-icon" src="../assets/icons/delete_blue.svg" />
                    <p>Delete</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="contacts-info-hl">
              <h4>Contact Information</h4>
            </div>
            <div class="contacts-info-content">
              <p class="label">Email</p>
              <p id="contact-mail" class="copy-mail">${contact.email}</p>
              <p class="label">Phone</p>
              <p id="contact-phone" class="copy-text">${contact.phone}</p>
            </div>
            <div id="edit-menu"></div>
            <div class="add-btn-mobile" onclick="showMobileEditMenu('${id}')">
            <img src="../assets/icons/more_vert.svg" />
            </div>`;
}
