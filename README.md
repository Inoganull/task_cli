# Task Tracker CLI

A simple command-line interface (CLI) to track tasks. Built with Node.js and uses a local `tasks.json` file for storage. The project form "https://roadmap.sh/projects/task-tracker".

## Features

- Add, Update, and Delete tasks
- Mark tasks as 'in-progress' or 'done'
- List all tasks or filter by status ('todo', 'in-progress', 'done')

## Usage

All commands are run from the terminal using `node index.js`.

### Add a new task

```bash
node index.js add "Your new task description"


# List all tasks
node index.js list

# List only tasks that are done
node index.js list done

# List only tasks that are to-do
node index.js list todo

# List only tasks that are in progress
node index.js list in-progress

#Update a task
node index.js update <ID> "The new and updated description"

# Mark as in-progress
node index.js mark-in-progress <ID>

# Mark as done
node index.js mark-done <ID>

#Delete a task
node index.js delete <ID>