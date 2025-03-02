document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-name');
    const mainPage = document.getElementById('main-page');
    const editPage = document.getElementById('edit-page');
    const editForm = document.getElementById('edit-task-form');
    const editTaskName = document.getElementById('edit-task-name');
    const editTaskStatus = document.getElementById('edit-task-status');

    let currentEditId = null;

    const fetchTasks = async () => {
        try {
            const response = await fetch('/task/v1/');
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            showNotification('Failed to load tasks. Please try again.', 'error');
        }
    };

    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.complete ? 'completed' : ''}`;
            li.innerHTML = `
                <span class="task-name">${escapeHtml(task.name)}</span>
                <span class="task-status">${task.complete ? 'Complete' : 'Incomplete'}</span>
                <div class="task-actions">
                    <button class="btn-toggle" onclick="toggleComplete('${task._id}', ${task.complete})">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-edit" onclick="editTask('${task._id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteTask('${task._id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskName = taskInput.value.trim();
        if (!taskName) {
            showNotification('Please enter a task name', 'warning');
            return;
        }
        try {
            await fetch('/task/v1/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: taskName })
            });
            taskForm.reset();
            fetchTasks();
            showNotification('Task added successfully', 'success');
        } catch (error) {
            console.error('Error adding task:', error);
            showNotification('Failed to add task. Please try again.', 'error');
        }
    });

    window.deleteTask = async (id) => {
        if (confirm('Are you sure you want to delete this task?')) {
            try {
                await fetch(`/task/v1/${id}`, { method: 'DELETE' });
                fetchTasks();
                showNotification('Task deleted successfully', 'success');
            } catch (error) {
                console.error('Error deleting task:', error);
                showNotification('Failed to delete task. Please try again.', 'error');
            }
        }
    };

    window.toggleComplete = async (id, complete) => {
        try {
            await fetch(`/task/v1/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ complete: !complete })
            });
            fetchTasks();
            showNotification('Task status updated', 'success');
        } catch (error) {
            console.error('Error updating task status:', error);
            showNotification('Failed to update task status. Please try again.', 'error');
        }
    };

    window.editTask = async (id) => {
        try {
            const response = await fetch(`/task/v1/${id}`);
            if (!response.ok) throw new Error('Failed to fetch task');
            const task = await response.json();
            
            editTaskName.value = task.name;
            editTaskStatus.value = task.complete.toString();
            currentEditId = id;
            
            mainPage.style.display = 'none';
            editPage.style.display = 'block';
        } catch (error) {
            console.error('Error fetching task for edit:', error);
            showNotification('Failed to load task for editing. Please try again.', 'error');
        }
    };

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newName = editTaskName.value.trim();
        const newStatus = editTaskStatus.value === 'true';

        if (!newName) {
            showNotification('Please enter a task name', 'warning');
            return;
        }

        try {
            await fetch(`/task/v1/${currentEditId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName, complete: newStatus })
            });
            cancelEdit();
            fetchTasks();
            showNotification('Task updated successfully', 'success');
        } catch (error) {
            console.error('Error updating task:', error);
            showNotification('Failed to update task. Please try again.', 'error');
        }
    });

    window.cancelEdit = () => {
        mainPage.style.display = 'block';
        editPage.style.display = 'none';
        currentEditId = null;
    };

    const showNotification = (message, type) => {
        // Implement a notification system here
        console.log(`${type.toUpperCase()}: ${message}`);
    };

    const escapeHtml = (unsafe) => {
        return unsafe.replace(/[&<"']/g, (m) => {
            switch (m) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '"': return '&quot;';
                default: return '&#039;';
            }
        });
    };

    fetchTasks();
});
