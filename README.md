Project Overview
Build a simple task tracking application inspired by Trello. Users should be able to create, edit, delete, assign, and manage tasks across three stages: To Do, In Progress, and Done.
Core Features
### User Management
- User Registration & Login (using Firebase Authentication)
- User Roles: All users can create and assign tasks
- Store user info in Firebase Firestore
### Task Management
- Create a new task with Title, Description, and Assigned To
- Edit and delete tasks
- Task Status: To Do | In Progress | Done
### Task Movement
- Move tasks using buttons (Move to In Progress, Move to Done)
- Drag and Drop functionality using a library like `react-beautiful-dnd`
### Task Board UI
- Display tasks in a 3-column layout: To Do, In Progress, Done
- Each column shows tasks by status
- Use cards with minimal styling (title + assigned user)
### Sample UI Layout:
### Tech Stack Guidelines
- Frontend: React, React Router
- Database: Firebase Firestore
- Authentication: Firebase Auth
- Drag & Drop: react-beautiful-dnd or similar
### Bonus Features (if time permits)
- Search/filter tasks by title or assigned user
- Due date and task priority
- Activity log (who moved which task and when)
- User profile page showing assigned tasks
### Time Limit
Focus on completing the basic working model first, then add bonus features if time allows.
Evaluation Criteria
Criteria Description
Functionality App runs and meets basic requirements
Code Structure Organized, modular, readable code
UI/UX Clean and intuitive interface, proper task visualization
Use of Tech Proper use of React and Firebase
Completion Core features implemented successfully within the time
Bonus Points For drag-and-drop, filters, or any creative bonus features