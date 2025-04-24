"use strict";

/* BOARD DRAG AND DROP */

let draggedTaskId;

/**
 * Prevents the default behavior of the event to allow dropping in the specified target area.
 * @param {Event} event - The event object representing the drop event.
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * Handles the drop event when a dragged task is dropped into a new target column. Updates the task's status and saves it in the database.
 * @param {Event} event - The event object representing the drop event.
 * @param {string} targetColumn - The target column where the task is being dropped (e.g., 'to_do', 'in_progress').
 * @async
 */
async function drop(event, targetColumn) {
    event.preventDefault();

    let column = event.currentTarget;
    column.classList.remove("highlight-column");

    let task = tasks.find(task => task.id === draggedTaskId);
    if (task) {
        task.status = targetColumn;
        await updateTaskInDatabase(task);
        await fetchTasksData();
    } else {
        console.error("drop: Task mit ID nicht gefunden:", draggedTaskId);
    }
}

/**
 * Marks a task as being dragged by adding the "dragged" CSS class to it. Sets the `draggedTaskId` to the ID of the task being dragged.
 * @param {string} taskId - The ID of the task that is being dragged.
 */
function startDragging(taskId) {
    draggedTaskId = taskId;

    let taskElement = document.getElementById(taskId);
    if (taskElement) {
        taskElement.classList.add("dragged");
    }
}

/**
 * Removes the "dragged" CSS class from the task when dragging ends, indicating the task is no longer being dragged.
 * @param {string} taskId - The ID of the task whose dragging has ended.
 */
function endDragging(taskId) {
    let taskElement = document.getElementById(taskId);
    if (taskElement) {
        taskElement.classList.remove("dragged");
    }
}

/**
 * Updates the task status in the database after a task is dropped into a new column.
 * @param {Object} task - The task object that is being updated.
 * @async
 */
async function updateTaskInDatabase(task) {
    try {
        const response = await fetch(`${BASE_URL}/tasks/${task.id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error(`Fehler beim speichern des task in der datenbank. status: ${response.status}`);
        }
    } catch (error) {
        console.error("Fehler beim speichern des task:", error);
    }
}

/**
 * Toggles the visibility of the "no tasks" message for each column based on whether it contains any tasks. If a column is empty, the message is displayed; otherwise, it is hidden.
 */
function emptyColumnMessage() {
    const columns = [
        { tasksWrapper: document.getElementById('to_do'), message: document.getElementById('to_do_message') },
        { tasksWrapper: document.getElementById('in_progress'), message: document.getElementById('in_progress_message') },
        { tasksWrapper: document.getElementById('await_feedback'), message: document.getElementById('await_feedback_message') },
        { tasksWrapper: document.getElementById('done'), message: document.getElementById('done_message') },
    ];

    columns.forEach(column => {
        if (column.tasksWrapper.children.length === 0) {
            column.message.classList.remove('d_none');
            column.tasksWrapper.classList.add('d_none');
        } else {
            column.message.classList.add('d_none');
            column.tasksWrapper.classList.remove('d_none');
        }
    });
}

/**
 * Highlights the target column when a task is dragged over it.
 * @param {Event} event - The drag event.
 */
function highlightColumn(event) {
    let column = event.currentTarget;

    if (!column.classList.contains("highlight-column")) {
        column.classList.add("highlight-column");
    }
}

/**
 * Removes the highlight from the column when a task is dragged out.
 * @param {Event} event - The drag event.
 */
function unhighlightColumn(event) {
    let column = event.currentTarget;

    if (column.contains(event.relatedTarget)) return;
    column.classList.remove("highlight-column");
}