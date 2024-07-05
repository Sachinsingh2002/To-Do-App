document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    saveTasksToLocalStorage(tasks);

    addTaskToDOM(taskText);
    taskInput.value = '';
}

function addTaskToDOM(taskText) {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(taskText, li);

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function deleteTask(taskText, li) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText);
    saveTasksToLocalStorage(tasks);

    li.remove();
}
