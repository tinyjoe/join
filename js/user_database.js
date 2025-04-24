/**
 * Load all contact objects from Firebase.
 * Add the id as key value pair to the object.
 * @returns {Array} - Array of all contacts from Firebase.
 */
async function loadAllContactsInfo() {
  let contacts = [];
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
 * Get the contact with the given id from Firebase.
 * @param {string} id - The id of the contact.
 * @returns {JSON} - The data of a specific contact tranformed to JSON.
 */
async function getContactById(id) {
  let contactResponse = await fetch(`${BASE_URL}/contacts/${id}.json`);
  let contactToJson = await contactResponse.json();
  return contactToJson;
}

/**
 * Create a new contact and store it in Firebase.
 * @param {object} contactData - The object with the needed key value pairs of the new contact.
 * @returns {JSON} - The JSON of the created contact.
 */
async function createContact(contactData) {
  let newContactResponse = await fetch(`${BASE_URL}/contacts.json`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });
  return (contactToJson = await newContactResponse.json());
}

/**
 * Update an existing contact in Firebase.
 * @param {object} contactData - The object with the needed key value pairs to update the contact.
 * @param {string} id - The id of the contact which should be updated.
 * @returns {JSON} - The JSON of the updated contact.
 */
async function updateContact(contactData, id) {
  const response = await fetch(`${BASE_URL}/contacts/${id}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });
  if (!response.ok) {
    throw new Error("Failed to update contact");
  }
  return await response.json();
}

/**
 * Delete an existing contact in Firebase.
 * @param {string} id - The id of the contact which should be deleted.
 * @returns {JSON} - The JSON of the deleted contact.
 */
async function deleteContact(id) {
  let response = await fetch(`${BASE_URL}/contacts/${id}.json`, {
    method: "DELETE",
  });
  return (responseToJson = await response.json());
}

/**
 * Load all users as json from Firebase.
 * @returns {JSON} - The JSON of all users from Firebase.
 */
async function loadUsers() {
  let usersResponse = await fetch(`${BASE_URL}/users.json`);
  let usersToJson = await usersResponse.json();
  return usersToJson;
}

/**
 * Load all user objects from Firebase.
 * Add the id as key value pair to the object.
 * @returns {Array} - The Array of all users from Firebase.
 */
async function loadAllUsersInfo() {
  let users = [];
  let usersResponse = await fetch(`${BASE_URL}/users.json`);
  let usersToJson = await usersResponse.json();
  if (usersToJson) {
    const userKeys = Object.keys(usersToJson);
    userKeys.forEach((key) => {
      users.push({
        id: key,
        ...usersToJson[key],
      });
    });
  }
  return users;
}

/**
 * Create a new user and store it in Firebase.
 * @param {object} userData - The object with the needed key value pairs of the new user.
 * @returns {JSON} - The JSON of the added user.
 */
async function createUser(userData) {
  let newUserResponse = await fetch(`${BASE_URL}/users.json`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return (userToJson = await newUserResponse.json());
}
