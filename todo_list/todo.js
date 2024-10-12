document.addEventListener("DOMContentLoaded", function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load tasks from localStorage
    const taskInput = document.getElementById('task');
    const submitBtn = document.getElementById('btn-submit');
    const taskList = document.getElementById('task-list');

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = ''; // Clear the current list

        tasks.forEach((task, index) => {
            const li = document.createElement('li');

            const taskText = document.createElement('span'); // Wrap task text in a span
            taskText.textContent = task.text;
            
            // Add class if task is completed
            if (task.completed) {
                taskText.classList.add('completed');
            }

            // Add click event listener to mark as completed
            taskText.addEventListener('click', () => {
                task.completed = !task.completed; // Toggle completed state
                saveTasks();
                renderTasks();
            });

            // Add a delete button to remove the task
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1); // Remove the task from the array
                saveTasks();
                renderTasks();
            });

            li.appendChild(taskText);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    };

    // Function to save tasks to localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task event
    submitBtn.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push({ text: task, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = ''; // Clear input field
        } else {
            alert("Please enter a task.");
        }
    });

    // Load tasks on initial load
    renderTasks();
});
