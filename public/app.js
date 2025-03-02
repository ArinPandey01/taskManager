document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    const fetchTasks = async () => {
        const res = await fetch('/task/v1/');
        const tasks = await res.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.name} - ${task.complete ? 'Complete' : 'Incomplete'}</span>
                <button onclick="deleteTask('${task._id}')">Delete</button>
                <button onclick="toggleComplete('${task._id}', ${task.complete})">Toggle Complete</button>
            `;
            taskList.appendChild(li);
        });
    };

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskName = document.getElementById('task-name').value;
        await fetch('/task/v1/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: taskName })
        });
        taskForm.reset();
        fetchTasks();
    });

    window.deleteTask = async (id) => {
        await fetch(`/task/v1/${id}`, { method: 'DELETE' });
        fetchTasks();
    };

    window.toggleComplete = async (id, complete) => {
        await fetch(`/task/v1/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ complete: !complete })
        });
        fetchTasks();
    };

    fetchTasks();
});
