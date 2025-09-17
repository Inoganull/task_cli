const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, 'tasks.json');

// Reading and Writing to th json file
function readTasks() {
    try {
        // check if the file exiists before reading
        if (!fs.existsSync(tasksFilePath)) {
            return [];
        }
        const data = fs.readFileSync(tasksFilePath, 'utf8');
        return JSON.parse(data);

    } catch (error) {
        console.error('Error reading tasks file:', error);
        return [];
    }

}

function writeTasks(tasks) {
    try {
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));

    } catch (error) {
        console.error('Error writing tasks file:', error);
    }
}

// add task functionality
function addTask(description) {
    const tasks = readTasks();
    const now = new Date().toISOString();

    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

    const newTask = {
        id: newId,
        description: description,
        status: 'todo',
        createdAt: now,
        updatedAt: now
    };

    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

// list tasks functionlity
function listTasks(statusFilter) {
    const tasks = readTasks();

    if (tasks.length === 0) {
        console.log("No tasks found.");
        return;
    }

    console.log("--- Your Tasks ---");

    const filteredTasks = statusFilter ? tasks.filter(task => task.status === statusFilter) : tasks;

    if (filteredTasks.length === 0) {
        console.log(`No tasks with status "${statusFilter}" found.`);
        return;
    }

    filteredTasks.forEach(task => {
        console.log(`ID: ${task.id} | Status: ${task.status.padEnd(11)} | Description: ${task.description}`);
    });
    console.log("------------------");
}

// update functionality
function updateTask(id, newDescription) {
    const tasks = readTasks();
    const taskId = parseInt(id, 10);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        console.log(`Error: Task with ID ${id} not found.`);
        return;
    }

    tasks[taskIndex].description = newDescription;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    writeTasks(tasks);
    console.log(`Task ${id} updated successfully.`);
}

// delete functionality
function deleteTask(id) {
    const tasks = readTasks();
    const taskId = parseInt(id, 10);
    const filteredTasks = tasks.filter(task => task.id != id);

    if (tasks.length === filteredTasks.length) {
        console.log(`Error: Task with ID ${id} not found.`);
        return;
    }

    writeTasks(filteredTasks);
    console.log(`Task ${id} deleted successfully.`);
}

// mark task as done functionality
function markTask(id, status) {
    const tasks = readTasks();
    const taskId = parseInt(id, 10);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        console.log(`Error: Task with ID ${id} not found.`);
        return;
    }

    tasks[taskIndex].status = status;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    writeTasks(tasks);
    console.log(`Task ${id} marked as ${status}.`);
}

// CLI logic handling user input
const [nodePath, scriptPath, command, ...args] = process.argv;

switch (command) {
    case 'add':
        if (args.length === 0) {
            console.log('Error: Please provide a task description.');
            console.log('Usage: node index.js add "Your task here');
        } else {
            addTask(args.join(' '));
        }
        break;

    case 'list':
        const status = args[0];
        listTasks(status);
        break;

    case 'update':
        if (args.length < 2) {
            console.log('Error: Please provide a task ID and new description.');
            console.log('Usage: node index.js update <id> "New description"');
        } else {
            updateTask(args[0], args.slice(1).join(' '));
        }
        break;

    case 'delete':
        if (args.length === 0) {
            console.log('Error: Please provide a task ID to delete.');
            console.log('Usage: node index.js delete <id>');
        } else {
            deleteTask(args[0]);
        }
        break;

    case 'mark-in-progress':
        if (args.length === 0) {
            console.log('Error: Please provide a task ID to mark.');
            console.log('Usage: node index.js mark-in-progress <id>');
        } else {
            markTask(args[0], 'in-progress');
        }
        break;

    case 'mark-done':
        if (args.length === 0) {
            console.log('Error: Please provide a task ID to mark.');
            console.log('Usage: node index.js mark-done <id>');
        } else {
            markTask(args[0], 'done');
        }
        break;

    default:
        console.log("Unknown command. Available commands:");
        console.log("  add \"<description>\"");
        console.log("  list [status]");
        console.log("  update <id> \"<new description>\"");
        console.log("  delete <id>");
        console.log("  mark-in-progress <id>");
        console.log("  mark-done <id>");
        break;
}