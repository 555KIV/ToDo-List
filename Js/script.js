document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById('new-task');
    var taskText = taskInput.value;

    if (taskText.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    var tasksList = document.getElementById('tasks');

    var taskItem = document.createElement('li');
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
    var taskItem = button.parentNode;
    var tasksList = document.getElementById('tasks');
    tasksList.removeChild(taskItem);

    saveTasks();
}

function toggleTask(button) {
    var taskItem = button.parentNode;
    taskItem.classList.toggle('completed');

    saveTasks();
}

function saveTasks() {
    var tasksList = document.getElementById('tasks');
    var tasks = [];

    for (var i = 0; i < tasksList.children.length; i++) {
        var taskText = tasksList.children[i].querySelector('span').innerText;
        var isCompleted = tasksList.children[i].classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var tasksList = document.getElementById('tasks');
    var storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        var tasks = JSON.parse(storedTasks);

        for (var i = 0; i < tasks.length; i++) {
            var taskItem = document.createElement('li');
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
