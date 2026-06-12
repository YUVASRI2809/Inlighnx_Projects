// Get DOM Elements
const addTaskButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");

// Store tasks
let tasks = [];

/*
    Load tasks from Local Storage
*/
window.addEventListener("DOMContentLoaded", () => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);

        tasks.forEach(task => {
            createTaskElement(task);
        });
    }
});

/*
    Add Task Button Click
*/
addTaskButton.addEventListener("click", addTask);

/*
    Add Task on Enter Key
*/
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

/*
    Function to Add a Task
*/
function addTask() {
    const taskText = taskInput.value.trim();

    // Error Handling
    if (taskText === "") {
        errorMessage.textContent = "Please enter a task!";
        return;
    }

    // Clear error message
    errorMessage.textContent = "";

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add to array
    tasks.push(task);

    // Add to UI
    createTaskElement(task);

    // Save to Local Storage
    saveTasks();

    // Clear input
    taskInput.value = "";

    // Focus input field
    taskInput.focus();
}

/*
    Function to Create Task Element
*/
function createTaskElement(task) {
    // Create list item
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    if (task.completed) {
        taskItem.classList.add("completed");
    }

    /*
        Checkbox
    */
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;

        taskItem.classList.toggle("completed");

        saveTasks();
    });

    /*
        Task Text
    */
    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = task.text;

    /*
        Delete Button
    */
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", () => {
        // Remove from array
        tasks = tasks.filter(t => t.id !== task.id);

        // Remove from UI
        taskItem.remove();

        // Save changes
        saveTasks();
    });

    // Append Elements
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}

/*
    Save Tasks to Local Storage
*/
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}