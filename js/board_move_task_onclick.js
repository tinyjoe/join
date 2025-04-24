"use strict";

/* BOARD MOVE TASK ONCLICK */

/**
 * Toggles the visibility of the "Move To" menu by adding or removing the `d_none` class.
 */
function toggleMoveToMenu() {
    let moveToMenu = document.getElementById("move_to_menu");
    moveToMenu.classList.toggle("d_none");
  
    resetActiveStatusClasses();
    highlightCurrentStatus();
  }
  
  /**
   * Moves the currently selected task to the specified column and updates the task's status.
   * @param {string} column - The name of the column to which the task should be moved.
   *                          Valid options are 'todo', 'in_progress', 'await_feedback', 'done'.
   */
  function moveTaskToColumn(column) {
    if (!currentTaskId) {
      console.error("No task selected to move");
      return;
    }
  
    let task = tasks.find((t) => t.id === currentTaskId);
    if (task) {
      task.status = column;
      updateTaskInFirebase(task);
      renderTasks();
      toggleMoveToMenu();
      showAnimation(`Task moved to ${column.replace("_", " ")}`, "../assets/img/board.png");
    } else {
      console.error("Task not found:", currentTaskId);
    }
  }
  
  /**
   * Removes all active status classes from the move-to menu.
   */
  function resetActiveStatusClasses() {
    document.querySelectorAll(".is-active").forEach((div) => {
      div.classList.remove("active-status", "active-status-top", "active-status-bottom");
    });
  }
  
  /**
   * Highlights the current status of the selected task.
   */
  function highlightCurrentStatus() {
    let task = tasks.find((t) => t.id === currentTaskId);
  
    let moveToTopDiv = document.querySelector(`.move-to-text-top[data-column="${task.status}"]`);
    let moveToBottomDiv = document.querySelector(`.move-to-text-bottom[data-column="${task.status}"]`);
    let currentColumnDiv = document.querySelector(`.is-active[data-column="${task.status}"]`);
  
    if (moveToTopDiv) {
      moveToTopDiv.classList.add("active-status", "active-status-top");
    } else if (moveToBottomDiv) {
      moveToBottomDiv.classList.add("active-status", "active-status-bottom");
    } else if (currentColumnDiv) {
      currentColumnDiv.classList.add("active-status");
    }
  }