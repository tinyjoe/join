"use strict";

/* BOARD TEMPLATES */

/**
 * Creates the HTML template for the left sidebar of the application.
 * @returns {string} The HTML structure of the sidebar as a string.
 */
function getSidebarTemplate() {
  return `
        <div class="left-sidebar">
           <img src="../assets/img/join_logo_white.svg" alt="join logo" />
           <div class="left-sidebar-links">
             <a class="links" href="summary.html">
               <img
                 class="sidebar-icons"
                 src="../assets/img/summary.png"
                 alt="Summary"
               />
               <p>Summary</p>
             </a>
             <a class="links" href="add_tasks.html">
               <img
                 class="sidebar-icons"
                 src="../assets/img/add_task.png"
                 alt="Add Task"
               />
               <p>Add Task</p>
             </a>
             <a class="links link-active" href="#">
               <img
                 class="sidebar-icons"
                 src="../assets/img/board.png"
                 alt="Board"
               />
               <p>Board</p>
             </a>
             <a class="links" href="contacts.html">
               <img
                 class="sidebar-icons"
                 src="../assets/img/contacts.png"
                 alt="Contacts"
               />
              <p>Contacts</p>
             </a>
           </div>
           <div class="left-sidebar-links">
             <a class="legacy-links" href="#"> Privacy Policy </a>
             <a class="legacy-links" href="#"> Legal notice </a>
           </div>
        </div>
    `;
}

/**
 * Creates the HTML template for the application's header.
 * @returns {string} The HTML structure of the header as a string.
 */
function getHeaderTemplate() {
  return `
        <div class="header-wrapper">
          <span class="app-description"> Kanban Project Management Tool</span>
          
          <img
            class="join-logo-responsive"
            src="../assets/img/join_logo_grey.svg"
            alt="logo"
          />
          <div class="header-icons">
            <img onclick="window.location.href='./help.html'"
              class="header-help-icon"
              src="../assets/img/help.png"
              alt="help"
            />
            <div id="contact-profile-icon" class="header-profil-icon" onclick="showHeaderMenu('contacts-header-menu')"></div>
            <div id="contacts-header-menu"></div>
          </div>
        </div>
    `;
}

/**
 * Creates the HTML template for the board's headline section.
 * @returns {string} The HTML structure of the headline section as a string.
 */
function getBoardHeadlineTemplate() {
  return `
          <div class="headline">
              <h1>Board</h1>
              <div class="searchbox-wrapper">
                <div class="searchbox-container"></div>
                <input onkeyup="getFilderedTask()" id="filter_input"
                  class="searchbox-input"
                  type="text"
                  placeholder="Find Task"
                />
                <button class="input-btn">
                  <img
                    class="input-btn-img"
                    src="../assets/img/search_glass.png"
                    alt="search"
                  />
                </button>
  
                <button onclick="openAddTaskPopUp()" class="add-task-btn">
                  Add task
                  <img
                    class="add-task-btn-img"
                    src="../assets/img/plus_white.png"
                    alt="plus"
                  />
                </button>
              
                <button class="add-task-btn-responsive">
                  <img onclick="openAddTaskPopUp()"
                    class="add-task-btn-img"
                    src="../assets/img/plus_white.png"
                    alt="plus"
                  />
                </button>
              </div>
          </div>
  
          <section>
          <div class="headline-responsive-wrapper">
            <div class="headline-responsive">
              <h1>Board</h1>
              <button class="add-task-btn-responsive">
                <img onclick="openAddTaskPopUp()"
                  class="add-task-btn-img"
                  src="../assets/img/plus_white.png"
                  alt="plus"
                />
              </button>
            </div>
             <div class="searchbox-wrapper-responsive">
            <input onkeyup="getFilderedTask()" id="filter_input_responsive"
              class="searchbox-input-responsive"
              type="text"
              placeholder="Find Task"
            />
            <button onclick="disableBtn()" id="input_btn" class="input-btn-responsive">
              <img 
                class="input-btn-img"
                src="../assets/img/search_glass.png"
                alt="search"
              />
            </button>
            </div>
            </div>
          </section>
    `;
}

/**
 * Generates the HTML template for a single task on the Kanban board.
 * @param {Object} task - The task object containing details like ID, title, description, and category.
 * @param {string} priorityImage - The path to the image representing the task's priority.
 * @param {string} categoryColor - The background color representing the task's category.
 * @param {string} assigneeInitials - HTML content for assignee initials.
 * @param {string} subtaskProgressHTML - HTML content representing the subtasks progress.
 * @param {number} progressPercentage - The progress percentage of the task.
 * @returns {string} The HTML structure of a single task as a string.
 */
function getTasksTemplate(
  task,
  priorityImage,
  categoryColor,
  assigneeInitials,
  subtaskProgressHTML,
  progressPercentage
) {
  return `    
          <div id="${task.id}" onclick="openTaskPopUp('${task.id}')" draggable="true" ondragstart="startDragging('${task.id}')" ondragend="endDragging('${task.id}')" class="kanban-task task">
                <div class="kanban-task-header"  style="background-color: ${categoryColor};">
                  <p>${task.category}</p>
                </div>
                <div class="task-title">
                  <h3>${task.title}</h3>
                </div>
                <div class="kanban-task-description">
                  <p>${task.description}</p>
                </div>
                <div id="kanban-task-subtasks" class="kanban-task-subtasks">
                      <progress value="${progressPercentage}" max="100"></progress>
                       ${subtaskProgressHTML}
                </div>
                <div class="kanban-task-footer">

                  <div class="asignees-profil">
                   ${assigneeInitials}
                  </div>

                  <div class="priority-info">
                     <img src="${priorityImage}" alt="${task.priority}" class="priority-icon">
                  </div>
                </div>
          </div>
`;
}

/**
 * Generates the HTML template for the task popup window.
 * @param {Object} task - The task object containing details like ID, title, description, and category.
 * @param {string} priorityImage - The path to the image representing the task's priority.
 * @param {string} categoryColor - The background color representing the task's category.
 * @param {string} assigneeContent - HTML content for assignee details.
 * @returns {string} The HTML structure of the task popup as a string.
 */
function getTaskPopUpTemplate(
  task,
  priorityImage,
  categoryColor,
  assigneeContent
) {
  return `
          <div class="pop-up-board-inner-container">
                <div class="pop-up-task-header">
                  <div class="header-category"  style="background-color: ${categoryColor};">
                    <p>${task.category}</p>
                  </div>
                  <img onclick="closePopUps()"
                    class="pop-up-close-img"
                    src="../assets/img/close_black.png"
                    alt="close"
                  />
                </div>
                <div class="pop-up-task-content">
                <div class="pop-up-title">
                  <h4>${task.title}</h4>
                  </div>
                  <div class="pop-up-description">
                    <p>
                      ${task.description}
                    </p>
                  </div>
                </div>
                <div class="pop-up-task-info-container">
                  <div class="pop-up-task-info">
                    <div class="task-info-label">Due date:</div>
                    <div class="task-info-value">Priority:</div>
                  </div>
                  <div class="pop-up-task-info">
                    <div class="task-info-label">${formatDate(task.dueDate)}</div>
                    <div class="task-info-value">
                    ${task.priority}
                      <img src="${priorityImage}" alt="${task.priority}" class="priority-icon" />
                    </div>
                  </div>
                </div>
                <div class="pop-up-assigned-to-wrapper">
                  <p>Assigned To:</p>
                  <div id="message" class="pop-up-assigned-profils">
                      <p>${assigneeContent}</p>
                  </div>
                </div>
                <div class="pop-up-subtasks">
                  <p>Subtasks</p>

                  <div id="single_subtasks" class="single-subtasks-wrapper"></div>
                  
                </div>
              </div>
              <div class="pop-up-footer">
                <img onclick="renderEditTaskPopUp('${task.id}'), renderDropdownContacts('${task.id}')"
                     onmouseover="changeImage('edit_img', 'edit')" 
                     onmouseout="changeImage('edit_img', 'edit')"
                     id="edit_img"
                     class="pop-up-footer-edit-img"
                     src="../assets/img/edit_black.png"
                     alt="edit"
                />

                <div class="pop-up-seperator"></div>

                <img onclick="deleteTaskData('${task.id}')"
                     onmouseover="changeImage('delete_img', 'delete')" 
                     onmouseout="changeImage('delete_img', 'delete')"
                     id="delete_img"
                     class="pop-up-footer-delete-img"
                     src="../assets/img/delete_black.png"
                     alt="delete"
                />
              </div> 

          <div id="edit_task_pop_up"></div>
    `;
}

/**
 * Creates the HTML template for editing a task in the popup window.
 * @param {Object} task - The task object containing details such as title, description, and due date.
 * @returns {string} The HTML structure of the edit task popup as a string.
 */
function getEditTaskPopUpTemplate(task) {
  return `
          <div class="pop-up-edit-task-wrapper responsive-pop-up-closed">
            <div class="pop-up-edit-task-inner-container">
              <div class="pop-up-edit-task-headline">
                <h4>Edit task</h4>
                <img
                  onclick="closePopUps()"
                  class="pop-up-close-img"
                  src="../assets/img/close_black.png"
                  alt="close"
                />
              </div>
              
              <div class="move-task-to-menu-wrapper">
                <div onclick="toggleMoveToMenu()" class="move-task-to-menu-headline">
                  Move Task:
                  <img src="../assets/img/board.png" alt="">
                </div>
                <div id="move_to_menu" class="move-task-to-menu-content d_none">
                  <div onclick="moveTaskToColumn('todo')" class="move-to-text-top is-active" data-column="todo">To Do</div>
                  <div onclick="moveTaskToColumn('in_progress')" class="move-to-text is-active" data-column="in_progress">In Progress</div>
                  <div onclick="moveTaskToColumn('await_feedback')" class="move-to-text is-active" data-column="await_feedback">Awaiting Feedback</div>
                  <div onclick="moveTaskToColumn('done')" class="move-to-text-bottom is-active" data-column="done">Done</div>
                </div>
              </div>

              <div class="pop-up-edit-task-form">
                <div class="pop-up-edit-task-title">
                  <label>
                    Title
                    <div class="required-sign">*</div>
                  </label>
                  <input oninput="checkForChanges()" id="edit_title" value="${task.title}"
                    class="pop-up-edit-task-input"
                    type="text"
                    placeholder="Enter a title"
                  />
                  <div id="error_message_edit" class="error-message"></div>
                </div>

                <div class="pop-up-edit-task-description">
                  <label> Description </label>
                  <textarea oninput="checkForChanges()" id="edit_description"
                    class="pop-up-edit-task-textarea"
                    rows="4"
                    placeholder="Enter a Description">${task.description}</textarea>
                </div>

                <div class="pop-up-edit-task-due-date">
                  <label>
                    Due date
                    <div class="required-sign">*</div>
                  </label>
                  <input onclick="setMinDateForDueDate()" oninput="checkForChanges()" id="edit_due_date" value="${task.dueDate}"
                   class="pop-up-edit-task-input"
                   type="date" />
                </div>

                <div class="pop-up-edit-task-priority">
                  <label>
                  Priority
                  </label>
                  <div class="prio-status">
                    <div onclick="changePrioButtonsEditPopUp(this)" onclick="checkForChanges()" id="prio_urgent" class="prio-btn">
                      Urgent
                      <img
                        class="prio-img"
                        src="../assets/img/prio_urgent_red.png"
                        alt="urgent"
                      />
                    </div>
                    <div onclick="changePrioButtonsEditPopUp(this)" onclick="checkForChanges()" id="prio_medium" class="prio-btn">
                      Medium
                      <img
                        class="prio-img"
                        src="../assets/img/prio_medium_orange.png"
                        alt="medium"
                      />
                    </div>
                    <div onclick="changePrioButtonsEditPopUp(this)" onclick="checkForChanges()" id="prio_low" class="prio-btn">
                      Low
                      <img
                        class="prio-img"
                        src="../assets/img/prio_low_green.png"
                        alt="low"
                      />
                    </div>
                  </div>
                </div>

                <div class="pop-up-edit-task-assigned-to">
                  <div>
                    Assigned to
                  </div>
            
                  <div class="dropdown">
                   <button onclick="toggleDropdownTaskPopUp(), toggleInputImage()" id="dropdown" class="drop-btn">
                     Select contacts to assign
                     <img id="dropdown_icon" class="dropdown-icon" src="../assets/img/arrow_drop_downaa.png" alt="arrow">
                   </button>
                   <div id="dropdown_content" class="dropdown-content-wrapper d_none">
                     
                      <div id="dropdown_contacts" class="dropdown-content"></div>

                   </div>
                  </div>
                  
                  <div id="selected_contacts" class="assigned-contacts"></div>

                </div>

                <div class="pop-up-edit-task-subtasks">
                  Subtasks
                  <div class="input-box">
                    <input onkeyup="handleSubtaskKeyPress(event, '${task.id}'); updateButtonImage('${task.id}');"
                    
                      id="input_add_subtask"
                      class="pop-up-edit-subtask-input"
                      type="text"
                      placeholder="Add new subtask"
                    />
                    
                    <button class="pop-up-edit-task-input-btn">
                    <div id="input_image_content">
                      <img onclick="errorMessage()" id="input_button_image"
                        class="pop-up-edit-task-input-btn-img"
                        src="../assets/img/add_black.png"
                        alt=""
                      />
                      </div>
                    </button>
                    
                  </div>

                  <div id="error_message" class="error-message"></div>

                  <ul id="added_subtasks" class="pop-up-edit-task-list-container"></ul>

                </div>
              </div>
            </div>
            <div class="pop-up-edit-task-footer">
            <button id="reset_button" onclick="resetTaskChanges()"
               class="pop-up-edit-task-btn"
               disabled
            >
            Reset changes
             <img
                  class="pop-up-edit-task-btn-img"
                  src="../assets/img/close_white.png"
                  alt="check"
                />
            </button>
              <button
               onclick="saveTaskChanges('${task.id}')"
                class="pop-up-edit-task-btn"
              >
                Ok
                <img
                  class="pop-up-edit-task-btn-img"
                  src="../assets/img/check_white.png"
                  alt="check"
                />
              </button>
            </div>
          </div>
           
    `;
}

/**
 * Generates the HTML template for a single subtask in the task editor.
 * @param {string} taskId - The ID of the parent task.
 * @param {Object} subtask - The subtask object containing its details.
 * @param {number} index - The index of the subtask within the list.
 * @returns {string} The HTML structure of a single subtask as a string.
 */
function getSubtasksTemplate(taskId, subtask, index) {
  return `
          <div class="subtask" id="subtask_${taskId}_${index}">
            <img class="checkbox" onclick="toggleSubtasksCheckbox('${taskId}', ${index})" 
                 id="checkbox_subtask_${taskId}_${index}"
                 src="../assets/img/checkbox_false.png" 
                 alt="checkbox">
            <span>${subtask.name}</span>
          </div>
  `;
}

/**
 * Generates the HTML template for adding a contact to the dropdown list.
 * @param {Object} contact - The contact object containing properties like name, color, and initials.
 * @returns {string} The HTML structure for adding a contact to the dropdown.
 */
function getAddDropdownContactsTemplate(contact) {
  return `<div class="nameInitials">
          <div class="contact-initials bg-${contact.color}">
            ${contact.initial}
          </div>
          <span class="contact-name">${contact.name}</span>
      </div>
      <input type="checkbox" 
             name="assignedContacts" 
             class="contact-checkbox" 
             data-name="${contact.name}" 
             ${isSelected(contact.name) ? "checked" : ""} />
    `;
}

/**
 * Creates the HTML template for a single contact in the dropdown menu.
 * @param {Object} contact - The contact object containing ID, name, initials, and color properties.
 * @param {Object} task - The task object containing the needed ID properties.
 * @returns {string} The HTML structure of a contact in the dropdown menu as a string.
 */
function getDropdownContactsTemplate(contact, task) {
  return `
         <div  class="dropdown-contact" onclick="toggleCheckboxContact('${contact.id}', '${task.id}')" id="selected_contact">
              <div class="dropdown-contact-name">
                <span class="dropdown-initial bg-${contact.color}">${contact.initial}</span>
                <p>${contact.name}</p>
              </div>
                <img id="checkbox_${contact.name}" src="../assets/img/checkbox_false.png" alt="checkbox">
          </div>
  `;
}

/**
 * Creates the HTML template for a selected contact in the dropdown menu.
 * @param {Object} contact - The contact object containing ID, name, initials, and color properties.
 * @param {Object} task - The task object containing the needed ID properties.
 * @returns {string} The HTML structure of a selected contact in the dropdown menu.
 */
function getSelectedDropdownContactsTemplate(contact, task) {
  return `
         <div  class="dropdown-contact checked" onclick="toggleCheckboxContact('${contact.id}', '${task.id}')" id="selected_contact">
              <div class="dropdown-contact-name">
                <span class="dropdown-initial bg-${contact.color}">${contact.initial}</span>
                <p>${contact.name}</p>
              </div>
                <img id="checkbox_${contact.name}" src="../assets/img/checkbox_true_white.png" alt="checkbox">
          </div>
  `;
}

/**
 * Generates the HTML template for displaying assignee initials.
 * @param {Object} assignee - The assignee object containing their initials and color properties.
 * @returns {string} The HTML structure of an assignee's initials as a string.
 */
function getAssigneeInitialsTemplate(assignee) {
  return `
         <div class="initials bg-${assignee.color}";>
           ${assignee.initial} 
         </div>
  `;
}

/**
 * Generates the HTML template for displaying a list of assigned contacts.
 * @param {Array} assignedTo - Array of assignee objects with properties `name`, `color`, and `initial`.
 * @returns {string} The HTML structure for displaying the assigned contacts or a message if no contacts are assigned.
 */
function getAssigneesTemplate(assignedTo) {
  if (Array.isArray(assignedTo)) {
    return assignedTo
      .map((assignee) => {
        return `
        <div class="single-assigned-profil-wrapper">
          <div class="single-assigned-profil">
            <div class="single-assigned-profil-initials bg-${assignee.color}">
              ${assignee.initial}
            </div>
            <div class="initial-name">
              ${assignee.name}
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }
  return `<p>No contacts selected</p> `;
}

/**
 * Creates the HTML template for a selected contact badge.
 * @param {Object} contact - The contact object containing properties `initial` and `color`.
 * @returns {string} The HTML structure of the selected contact badge.
 */
function getSelectedContactsTemplate(contact) {
  return `
          <div id="selected_contact" class="selected-contact bg-${contact.color}">${contact.initial}</div>
  `;
}

/**
 * Generates the HTML template for a completed subtask.
 * @param {string} taskId - The ID of the parent task.
 * @param {Object} subtask - The subtask object containing its name.
 * @param {number} index - The index of the subtask within the list.
 * @returns {string} The HTML structure of a completed subtask with a checked checkbox.
 */
function getDoneSubtasksTemplate(taskId, subtask, index) {
  return `
          <div class="subtask" id="subtask_${taskId}_${index}">
            <img class="checkbox" onclick="toggleSubtasksCheckbox('${taskId}', ${index})" 
                 id="checkbox_subtask_${taskId}_${index}"
                 src="../assets/img/checkbox_true.png" 
                 alt="checkbox">
            <span>${subtask.name}</span>
          </div>
  `;
}

/**
 * Creates the HTML template for a subtask that has been added to the task editor.
 * @param {Object} addedSubtask - The subtask object containing properties `id` and `name`.
 * @returns {string} The HTML structure for an added subtask, including edit and delete buttons.
 */
function getAddedSubtasksTemplate(addedSubtask, task) {
  return `
          <li onmouseover="showIcons(this)" onmouseout="hideIcons(this)" class="added-subtask-item" data-id="${addedSubtask.id}">
            <span>${addedSubtask.name}</span>
            <div class="list-icon-container">
              <img onclick="editSubtaskEditPopUp('${addedSubtask.id}', '${task.id}')" class="icon-container-images" src="../assets/img/edit.png" alt="edit icon">
              <div class="vertical_line"></div>
              <img onclick="deleteAddedSubtaskEditPopUp('${addedSubtask.name}', '${task.id}')" class="icon-container-images" src="../assets/img/delete.png" alt="delete icon">
            </div>
          </li>
        `;
}

/**
 * Generates the HTML template for the "Add Task" popup.
 * @returns {string} The HTML structure of the "Add Task" popup.
 */
function getAddTaskPopUpTemplate() {
  return `
         <div class="headingAndAnEx">
              <h1>Add Task</h1>
              <img onclick="closePopUps()" class="makeEnEx" src="../assets/img/makeEnEx.png" alt="">
            </div>
            <div class="bothSides">
              <div class="leftSide">
                <div class="inputStyle">
                  <span for="inputField">Title<span class="required-asterisk">*</span></span>
                  <input type="text" id="inputFieldTitle" placeholder="Enter a title" class="titleInput"
                    oninput="checkForm()" />
                </div>
                <div class="inputStyle">
                  <span for="inputField">Description</span>
                  <textarea id="inputFieldDescription" placeholder="Enter a Description"
                    class="titleInputDescription"></textarea>
                </div>
                <div class="inputStyle">
                  <span class="assignedToSpanStyle" for="inputField">Assigned to</span>
                  <div id="selectOnes" class="selectContactsToAssign" onclick="toggleContactDropdown()">
                    <span id="selectedContacts" name="assignedContactsDisplay">Select contacts to assign</span>
                    <img id="dropdownArrow2" src="../assets/img/arrow_drop_downaa.png" class="dropdown-arrow" />
                    <div class="category-dropdown" id="categoryDropdown2"></div>
                  </div>
                  <div class="completeContacts">
                    <div id="selectedContactsBadges" class="selected-contacts-badges-container"></div>
                    <div class="maxContacts"></div>
                  </div>
                </div>
              </div>
              <div class="seperator1"></div>
              <div class="rightSide">
                <div class="inputStyle">
                  <span for="inputField">Due date<span class="required-asterisk">*</span></span>
                  <input type="date" id="inputFieldDueDate" class="titleInput" oninput="checkForm()" />
                </div>
                <div class="priorityStyle">
                  <span for="inputField">Prio</span>
                  <div class="priority-button">
                    <button id="inputFieldUrgent" class="priobtn urgMedLow-btn" onclick="setPriority(this, 'urgent')">
                      Urgent
                      <img src="../assets/img/urgent.png" class="priority-icon" />
                    </button>
                    <button id="inputFieldMedium" class="priobtn urgMedLow-btn-medium active-medium"
                      onclick="setPriority(this, 'medium')">
                      Medium
                      <img src="../assets/img/medium.png" class="priority-icon" />
                    </button>
                    <button id="inputFieldLow" class="priobtn urgMedLow-btn" onclick="setPriority(this, 'low')">
                      Low
                      <img src="../assets/img/low.png" class="priority-icon" />
                    </button>
                  </div>
                </div>
                <div class="inputStyle">
                  <span class="spanCategoryStyle" for="inputField">Category<span class="required-asterisk">*</span></span>
                  <div id="selectCat" class="selectCategory" onclick="toggleDropdown(event)">
                    <span id="selectedCategory">Select task category</span>
                    <img id="dropdownArrow" src="../assets/img/arrow_drop_downaa.png" class="dropdown-arrow" />
                    <div class="category-dropdown" id="categoryDropdown">
                      <span onclick="selectCategory('Technical Task')">Technical Task</span>
                      <span onclick="selectCategory('User Story')">User Story</span>
                    </div>
                  </div>
                </div>
                <div class="inputStyle">
                  <span class="SubtaskSpanStyle" for="inputField">Subtasks</span>
                  <div class="subtaskInputWrapper">
                    <input type="text" id="inputFieldSubtask" placeholder="Add new subtask" class="subtaskInput" />
                    <div class="iconWrapper" id="iconWrapper">
                      <img src="../assets/img/Propertyadd.png" id="actionIcon" class="icon" onclick="addSubtask()" />
                    </div>
                  </div>

                  <div id="subtaskList" class="subtaskList"></div>

                </div>
              </div>
            </div>
            <div class="addTaskFooter">
              <div class="addTaskFooterLeftSide">
                <span class="mobileSpanStyle" style="color: black; position: relative">
                  <span style="position: absolute; left: -5px; top: -7px; color: red">*</span>
                  This Field is required
                </span>
              </div>
              
              <div class="clear-task-button">
                <button class="btn clear-btn" onclick="clearEverything()">
                  Clear
                  <img id="cancelIcon" src="../assets/img/iconoir_cancel.png" alt="Cancel Icon" />
                </button>
                <button id="createTaskBtn" class="btn create-task-btn" onclick="createTask()" disabled>
                  Create Task
                  <img id="checkIcon" src="../assets/img/check_white.png" alt="Check Icon" />
                </button>
              </div>
            </div>

        <div class="showMe d-none">
          Task Added To Board
          <img src="../assets/img/board.png" alt="" />
        </div> 
  `;
}

/**
 * Generates the HTML template for the button container with cancel and check images.
 * @param {string} taskId - The ID of the task associated with the button container.
 * @returns {string} The HTML structure of the button container.
 */

function getBeforeButtonContainer(taskId) {
  return `
          <button class="pop-up-edit-task-input-btn">
            <div id="button_content_with_images" class="pop-up-edit-task-input-btn-img-container">
                <img onclick="clearInputs('${taskId}')" class="pop-up-edit-task-input-btn-img" src="../assets/img/iconoir_cancel.png" alt="image 1">
                <div class="vertical_line"></div>
                <img onclick="addSubtaskEditPopUp('${taskId}')" class="pop-up-edit-task-input-btn-img" src="../assets/img/check_black.png" alt="image 2">
            </div>
          </button>
  `;
}

/**
 * Creates the HTML template for a button container with a single "add" image.
 * @returns {string} The HTML structure of the button container.
 */

function getAfterButtonContainer() {
  return `
          <button class="pop-up-edit-task-input-btn">
            <img id="input_button_image"class="pop-up-edit-task-input-btn-img"src="../assets/img/add_black.png"alt="" />
          </button> 
  `;
}

/**
 * Generates the HTML template for editing a subtask input field with associated buttons.
 * @param {string} id - The ID of the subtask being edited.
 * @param {Object} subtask - The subtask object containing its name.
 * @param {Object} task - The task object.
 * @returns {string} The HTML structure for editing a subtask input field.
 */

function getEditSubtaskInput(id, subtask, task) {
  return `
          <input type="text" value="${subtask.name}" 
                onblur="saveEditedSubtaskEditPopUp('${id}', this.value, '${task.id}')"  
                onkeydown="handleEnterKey(event, '${id}', this)" 
                class="edit-subtask-input">
          <div class="list-icon-container">
                <img onclick="deleteAddedSubtaskEditPopUp('${subtask.name}', '${task.id}')" 
                class="icon-container-images" 
                src="../assets/img/delete.png" 
                alt="check icon">
          <div class="vertical_line"></div>
                <img onclick="saveEditedSubtaskEditPopUp('${id}', '${task.id}')"
                class="icon-container-images" 
                src="../assets/img/check_black.png" 
          </div>  
  `;
}