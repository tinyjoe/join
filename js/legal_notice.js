/**
 * Load header and sidebar dynamically.
 * Show content after loading header and sidebar
 * @param {string} header - The id of header container.
 * @param {string} sidebar - The id of sidebar container.
 * @param {string} link - The id of navigation item that will be focused.
 */
function init(header, sidebar, link) {
  let legalContent = document.getElementById("legal-content-wrapper");
  createHeader(header);
  createSidebar(sidebar, link);
  setTimeout(() => {
    legalContent.classList.remove("hidden");
  }, 100);
}

/**
 * Function to navigate back from legal notice page whether the user is logged in or not.
 */
function navigateBackLegal() {
  if (JSON.parse(localStorage.getItem("loggedIn"))) {
    window.location.href = "../pages/privacy_policy.html";
  } else {
    window.location.href = "../pages/login.html";
  }
}
