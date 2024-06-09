document.addEventListener('DOMContentLoaded', function() {
    let displayedTasks = [];

    const addButton = document.getElementById('add');
    const sortButton = document.getElementById('sorting');
    const todoListContainer = document.getElementById('todo-list');
    const taskNameInput = document.getElementById('to-do');

    addButton.addEventListener('click', function() {
        const taskName = taskNameInput.value.trim();

        if (taskName) {
            const newTask = {
                id: displayedTasks.length + 1,
                name: taskName,
                createdDate: new Date(),
                completed: false
            };
            displayedTasks.push(newTask);
            addTaskToDisplay(newTask);
            taskNameInput.value = '';
        }
    });

    function addTaskToDisplay(task) {
        const listItem = document.createElement('li'); 
        listItem.classList.add('item'); 
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.dataset.taskId = task.id;

        const label = document.createElement('label');
        label.htmlFor = 'task-' + task.id;
        label.textContent = `${task.name} - Created: ${task.createdDate.toLocaleString()}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.dataset.taskId = task.id;

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(removeButton); 
        todoListContainer.appendChild(listItem);

        checkbox.addEventListener('change', function() {
            task.completed = this.checked;
            label.style.textDecoration = this.checked ? 'line-through' : 'none';
        });

        todoListContainer.addEventListener('click', function(event) {
            if (event.target.tagName === 'BUTTON' && event.target.dataset.taskId) {
                const taskId = parseInt(event.target.dataset.taskId, 10);
                displayedTasks = displayedTasks.filter(task => task.id !== taskId);
                displayTasks();
            }
        });
    }

    function displayTasks() {
        todoListContainer.innerHTML = '';
        displayedTasks.forEach(function(task) {
            addTaskToDisplay(task);
        });
    }

    sortButton.addEventListener('click', function() {
        displayedTasks.sort(function(a, b) {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        displayTasks();
    });
    addButton.addEventListener('click', function() {
        const taskName = taskNameInput.value.trim();
    
        if (taskName && taskName.length > 3 && taskName[0] === taskName[0].toUpperCase()) {
            const newTask = {
                id: displayedTasks.length + 1,
                name: taskName,
                createdDate: new Date(),
                completed: false
            };
            displayedTasks.push(newTask);
            addTaskToDisplay(newTask);
            taskNameInput.value = '';
        } else {
            alert('Please make sure that the first character is in uppercase, it shouldn’t be empty and it must have more than three characters.');
        }
    });
});