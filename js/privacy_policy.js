/**
 * Load header and sidebar dynamically.
 * Show content after loading header and sidebar
 * @param {string} header - The id of header container.
 * @param {string} sidebar - The id of sidebar container.
 * @param {string} link - The id of navigation item that will be focused.
 */
function init(header, sidebar, link) {
  let privacyContent = document.getElementById("privacy-content-wrapper");
  createHeader(header);
  createSidebar(sidebar, link);
  setTimeout(() => {
    privacyContent.classList.remove("hidden");
  }, 100);
}

/**
 * Function to navigate back from privacy policy page whether the user is logged in or not.
 */
function navigateBackPrivacy() {
  if (JSON.parse(localStorage.getItem("loggedIn"))) {
    window.location.href = "../pages/contacts.html";
  } else {
    window.location.href = "../pages/login.html";
  }
}
