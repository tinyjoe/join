let headerMenuShown = false;

/**
 * Render the template of the header menu.
 */
function renderHeaderMenu() {
  return `<div class="header-menu-container">
                <div
                  class="header-menu-item hidden-desktop"
                  onclick="window.location.href='../pages/help.html'"
                >
                  <p class="header-menu-text">Help</p>
                </div>
                <div
                  class="header-menu-item"
                  onclick="window.location.href='../pages/legal_notice.html'"
                >
                  <p class="header-menu-text">Legal Notice</p>
                </div>
                <div
                  class="header-menu-item"
                  onclick="window.location.href='../pages/privacy_policy.html'"
                >
                  <p class="header-menu-text">Privacy Policy</p>
                </div>
                <div class="header-menu-item" onclick="logOut(event)">
                  <p class="header-menu-text">Log out</p>
                </div>
              </div>`;
}

/**
 * Show the header menu.
 * @param {string} headerId - The id of the header container.
 */
function showHeaderMenu(headerId) {
  let headerMenu = document.getElementById(headerId);
  if (headerMenuShown) {
    headerMenu.innerHTML = "";
  } else {
    headerMenu.innerHTML = renderHeaderMenu();
  }
  headerMenuShown = !headerMenuShown;
}

/**
 * Show the sidebar.
 * @param {string} sidebarId - The id of sidebar container.
 * @param {string} linkId - The id of navigation item that will be focused.
 */
function createSidebar(sidebarId, linkId) {
  let sidebar = document.getElementById(sidebarId);
  if (JSON.parse(localStorage.getItem("loggedIn"))) {
    sidebar.innerHTML = renderSidebar();
  } else {
    sidebar.innerHTML = renderPlainSidebar();
  }
  if (linkId != "") {
    let activeLink = document.getElementById(linkId);
    activeLink.classList.add("link-active");
  }
}

/**
 * Render the template of the sidebar.
 */
function renderSidebar() {
  return `<div class="left-sidebar">
      <img class="bigLogo" src="../assets/img/join_logo_white.svg" alt="join logo" />
      <div class="left-sidebar-links">
        <a id="summary-link" class="links" href="../pages/summary.html">
          <img class="sidebar-icons" src="../assets/img/summary.png" alt="Summary" />
          <p>Summary</p>
        </a>
        <a id="add-task-link" class="links" href="../pages/add_tasks.html">
          <img class="sidebar-icons" src="../assets/img/add_task.png" alt="Add Task" />
          <p>Add Task</p>
        </a>
        <a id="board-link" class="links" href="../pages/board.html">
          <img class="sidebar-icons" src="../assets/img/board.png" alt="Board" />
          <p>Board</p>
        </a>
        <a id="contacts-link" class="links" href="../pages/contacts.html">
          <img class="sidebar-icons" src="../assets/img/contacts.png" alt="Contacts" />
          <p>Contacts</p>
        </a>
      </div>
      <div class="left-sidebar-links">
        <a id="privacy-link" class="legacy-links" href="../pages/privacy_policy.html"> Privacy Policy </a>
        <a id="legal-link" class="legacy-links" href="../pages/legal_notice.html"> Legal notice </a>
      </div>
    </div>`;
}

/**
 * Render the template of the sidebar when user is not logged in.
 */
function renderPlainSidebar() {
  return `<div class="left-sidebar">
      <img class="bigLogo" src="../assets/img/join_logo_white.svg" alt="join logo" />
      <div class="links-placeholder"></div>
      <div class="left-sidebar-links">
        <a id="privacy-link" class="legacy-links" href="../pages/privacy_policy.html"> Privacy Policy </a>
        <a id="legal-link" class="legacy-links" href="../pages/legal_notice.html"> Legal notice </a>
      </div>
    </div>`;
}

/**
 * Show the header.
 * @param {string} headerId - The id of header container.
 */
function createHeader(headerId) {
  let header = document.getElementById(headerId);
  let user = getUserFromLocalStorage();
  if (JSON.parse(localStorage.getItem("loggedIn"))) {
    header.innerHTML = renderHeader(user.initial);
  } else {
    header.innerHTML = "";
    header.innerHTML = renderPlainHeader();
  }
}

/**
 * Render the template of the header.
 * @param {string} initial - The initial of the logged in user.
 */
function renderHeader(initial) {
  return `<header id="header">
      <div class="header-wrapper">
        <div>
          <img class="mobileLogoStyle" src="../assets/img/join_logo_grey.svg">
          <span class="KanbanSpanStyle">Kanban Project Management Tool</span>
        </div>
        <div class="header-icons">
          <img class="header-help-icon hidden-mobile" src="../assets/img/help.png" alt="help" onclick="window.location.href='./help.html'"/>
          <div id="contact-profile-icon" class="header-profil-icon" onclick="showHeaderMenu('contacts-header-menu')">${initial}</div>
          <div id="contacts-header-menu"></div>
        </div>
      </div>
    </header>`;
}

/**
 * Render the template of the header when the user is not logged in.
 */
function renderPlainHeader() {
  return `<header id="header">
      <div class="header-wrapper">
        <div>
          <img class="mobileLogoStyle" src="../assets/img/join_logo_grey.svg">
          <span class="KanbanSpanStyle">Kanban Project Management Tool</span>
        </div>
      </div>
    </header>`;
}
