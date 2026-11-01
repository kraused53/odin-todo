# Todo App

A browser-based todo application built with HTML, CSS, and JavaScript as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

The application allows users to create, organize, edit, and manage tasks through a simple interface. Tasks can be assigned due dates and severity levels, with options to filter tasks by completion status and severity.

## Features

- **Task Management**
  - Create new tasks.
  - Edit existing tasks.
  - Delete individual tasks.
  - Mark tasks as completed or uncompleted.
  - Remove all completed tasks.

- **Task Organization**
  - Assign due dates to tasks.
  - Assign severity levels (Low, Medium, High).
  - Add descriptions to tasks.
  - Filter tasks by completion status.
  - Filter tasks by severity level.

- **Data Persistence**
  - Save tasks to browser `localStorage`.
  - Restore saved tasks when the application is reopened.
  - Preserve task information between browser sessions.

## Technologies

- HTML5
- CSS3
- JavaScript (ES6+)
- Webpack
- [date-fns](https://date-fns.org/) – Date formatting and manipulation.
- Browser `localStorage` – Client-side data persistence.

## Getting Started

### Prerequisites

You will need [Node.js](https://nodejs.org/) and npm installed on your computer.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kraused53/odin-todo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd odin-todo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

Start the Webpack development server:

```bash
npm run dev
```

Webpack will compile the application, start a local development server, and automatically open the application in your browser.

### Production Build

To generate an optimized production build:

```bash
npm run build
```

The compiled application will be output to the `dist/` directory.

## Project Structure

```text
odin-todo/
├── src/
│   ├── fonts/
│   ├── images/
│   ├── dialogs.js
│   ├── index.js
│   ├── project.js
│   ├── screen.js
│   ├── severity.js
│   ├── styles.css
│   ├── task.js
│   ├── task-list.js
│   ├── template.html
│   └── utility.js
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

### JavaScript Modules

| Module | Responsibility |
|---|---|
| `index.js` | Application initialization and event listeners. |
| `task.js` | Task class and task properties. |
| `task-list.js` | Task creation, editing, deletion, filtering, and storage. |
| `screen.js` | Screen management and dynamic task card rendering. |
| `dialogs.js` | Creating and editing tasks through HTML dialogs. |
| `severity.js` | Severity constants and helper functions. |
| `project.js` | Project class. |
| `utility.js` | Utility functions. |

## Data Storage

Tasks are stored in the browser's `localStorage`, allowing them to persist between sessions without requiring a backend or database.

Data is stored locally in the browser and is not synchronized between devices or browsers.

Clearing the browser's site data will remove the saved tasks.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- [The Odin Project](https://www.theodinproject.com/) for the curriculum and project inspiration.
- [date-fns](https://date-fns.org/) for date formatting utilities.