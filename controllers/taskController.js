const Task = require('../models/tasks');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error) {
        console.error(`Error fetching tasks: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

const getATask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(`Error fetching task: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

const postATask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        console.error(`Error creating task: ${error.message}`);
        res.status(400).json({ message: 'Invalid data' });
    }
};

const patchATask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(`Error updating task: ${error.message}`);
        res.status(400).json({ message: 'Invalid data' });
    }
};

const deleteATask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(`Error deleting task: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllTasks,
    getATask,
    postATask,
    patchATask,
    deleteATask
};
