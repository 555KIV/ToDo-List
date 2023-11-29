document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById('new-task');
    let taskText = taskInput.value;

    if (taskText.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    let tasksList = document.getElementById('tasks');

    let taskItem = document.createElement('li');
    taskItem.className = 'todo-item';
    taskItem.innerHTML = `
                <span>${taskText}</span>
                <button class="btn-done" onclick="toggleTask(this)">✔</button>
                <button class="but-del" onclick="removeTask(this)">✖</button>
            `;

    tasksList.appendChild(taskItem);

    saveTasks();
    taskInput.value = '';
    taskInput.focus();
}

function removeTask(button) {
    let taskItem = button.parentNode;
    let tasksList = document.getElementById('tasks');
    tasksList.removeChild(taskItem);

    saveTasks();
}

function toggleTask(button) {
    let taskItem = button.parentNode;
    taskItem.classList.toggle('completed');

    saveTasks();
}

function saveTasks() {
    let tasksList = document.getElementById('tasks');
    let tasks = [];

    for (let i = 0; i < tasksList.children.length; i++) {
        let taskText = tasksList.children[i].querySelector('span').innerText;
        let isCompleted = tasksList.children[i].classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasksList = document.getElementById('tasks');
    let storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        let tasks = JSON.parse(storedTasks);

        for (let i = 0; i < tasks.length; i++) {
            let taskItem = document.createElement('li');
            taskItem.className = 'todo-item' + (tasks[i].completed ? ' completed' : '');
            taskItem.innerHTML = `
                        <span>${tasks[i].text}</span>
                        <button class="btn-done" onclick="toggleTask(this)">✔</button>
                        <button class="but-del" onclick="removeTask(this)">✖</button>
                    `;


            tasksList.appendChild(taskItem);
        }
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}
