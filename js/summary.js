/**
 * Navigates the user to the board page.
 */
function navigateToBoard() {
  window.location.href = "board.html";
}

/**
 * Loads data for the summary page, including tasks and greeting messages.
 * Sets up the header and sidebar and makes the summary content visible.
 * @param {HTMLElement} header - The header element to be created.
 * @param {HTMLElement} sidebar - The sidebar element to be created.
 * @param {string} link - The link associated with the sidebar.
 */
function loadData(header, sidebar, link) {
  let summaryContent = document.getElementById("summary-content");
  createHeader(header);
  createSidebar(sidebar, link);
  setTimeout(() => {
    loadTasks();
    loadGreeting();
    summaryContent.classList.remove("hidden");
  }, 100);
}

/**
 * Fetches tasks from the API and processes them for various views.
 */
async function loadTasks() {
  const response = await fetch(
    "https://join-6838e-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
  );
  const data = await response.json();
  showHowManyTasksUrgent(data);
  taskInProgess(data);
  taskToDo(data);
  taskInBoard(data);
  taskDone(data);
  taskAwaiting(data);
}

/**
 * Loads and displays greeting messages and the user's username.
 */
function loadGreeting() {
  displayGreeting();
  displayUsername();
}

/**
 * Displays the number of urgent tasks and calculates the nearest due date.
 * @param {Object} data - The tasks data object.
 */
function showHowManyTasksUrgent(data) {
  const urgentTasks = Object.values(data).filter((task) =>
    task.priority?.includes("Urgent")
  );
  let urgentCount = document.getElementById("urgentCount");
  urgentCount.innerHTML = urgentTasks.length;
  if (urgentTasks.length > 0) {
    filterWichDateNearest(urgentTasks);
  } else {
    let nextDate = document.getElementById("nextDate");
    nextDate.innerHTML = " - ";
  }
}

/**
 * Displays the number of tasks currently in progress.
 * @param {Object} data - The tasks data object.
 */
function taskInProgess(data) {
  const progressTasks = Object.values(data).filter((task) =>
    task.status?.includes("in_progress")
  );
  let taskInProg = document.getElementById("taskInProg");
  taskInProg.innerHTML = progressTasks.length;
}

/**
 * Filters urgent tasks to find the nearest due date and displays it.
 * @param {Array} urgentTasks - The list of urgent tasks.
 */
function filterWichDateNearest(urgentTasks) {
  let nextDate = document.getElementById("nextDate");
  const sortedTasks = urgentTasks.sort((a, b) => {
    const aDate = new Date(a.dueDate);
    const bDate = new Date(b.dueDate);
    return aDate - bDate;
  });
  date = new Date(sortedTasks[0].dueDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  nextDate.innerHTML = date.toLocaleDateString("en-US", options);
}

/**
 * Displays the number of tasks marked as "to-do".
 * @param {Object} data - The tasks data object.
 */
function taskToDo(data) {
  const tasksToDo = Object.values(data).filter((task) =>
    task.status?.includes("todo")
  );
  let taskToDo = document.getElementById("taskToDo");
  taskToDo.innerHTML = tasksToDo.length;
}

/**
 * Displays the total number of tasks in the board.
 * @param {Object} data - The tasks data object.
 */
function taskInBoard(data) {
  let taskInBoardCount = document.getElementById("taskInBoardCount");
  let tasksInBoard = Object.values(data).length;
  taskInBoardCount.innerHTML = tasksInBoard;
}

/**
 * Displays the number of tasks marked as "done".
 * @param {Object} data - The tasks data object.
 */
function taskDone(data) {
  const tasksDone = Object.values(data).filter((task) =>
    task.status?.includes("done")
  );
  let tasksDoneCount = document.getElementById("tasksDoneCount");
  tasksDoneCount.innerHTML = tasksDone.length;
}

/**
 * Displays the number of tasks awaiting feedback.
 * @param {Object} data - The tasks data object.
 */
function taskAwaiting(data) {
  const tasksAwaiting = Object.values(data).filter((task) =>
    task.status?.includes("await_feedback")
  );
  let tasksAwaitingCount = document.getElementById("tasksAwaitingCount");
  tasksAwaitingCount.innerHTML = tasksAwaiting.length;
}

/**
 * Displays a greeting message based on the current time of day.
 */
function displayGreeting() {
  const greetingElement = document.getElementById("greeting");
  const currentHour = new Date().getHours();
  let greetingMessage;
  if (currentHour < 12) {
    greetingMessage = "Good Morning";
  } else if (currentHour < 18) {
    greetingMessage = "Good Afternoon";
  } else {
    greetingMessage = "Good Evening";
  }
  greetingElement.innerHTML = greetingMessage;
}

/**
 * Retrieves the user data from local storage and displays the username and initial.
 */
function getUserFromStorage() {
  let userDataAsText = localStorage.getItem("user");
  if (userDataAsText) {
    user = JSON.parse(userDataAsText);
  }
  console.log(user);
  displayUsername(user);
  displayInitial(user);
}

/**
 * Displays the user's username in the UI.
 */
function displayUsername() {
  let userName = document.getElementById("userName");
  let user = getUserFromLocalStorage();
  userName.innerHTML = user.name;
}

/**
 * Displays the user's initials in the UI.
 * @param {Object} user - The user object.
 */
function displayInitial(user) {
  let userInitial = document.getElementById("userInitial");
  userInitial.innerHTML = user.initial;
}
