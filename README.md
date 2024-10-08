Expense Tracker Application
A full-stack Expense Tracker application that allows users to add, view, manage, and analyze their expenses. The frontend is built using React, while the backend uses Node.js, Express, and MongoDB for handling data and user authentication. The application is fully deployed, offering a smooth and user-friendly experience for managing personal finances.

Live Demo
Frontend: [https://swiftrut-task-7.vercel.app](https://swiftrut-task-8.vercel.app/)
Backend: [https://swiftrut-task-7.onrender.com](https://swiftrut-task-8.onrender.com)

Running the Application
Frontend
Clone the repository:
npm install
npm start

Backend
Clone the repository:
Install dependencies:
npm install
Run the backend server:
npm start

Frontend Development
Expense Form: Allows users to add expenses with fields for amount, description, date, category, and payment method (cash/credit). Includes form validation to ensure data accuracy.
Expense List: Displays all expenses in a sortable and paginated table, with options to filter by category, date, and payment method. Inline editing allows users to update expenses directly from the list.
Filters & Search: Users can filter by date range, category, or payment method and search for specific expenses via a search bar.
Charts and Statistics: Displays detailed expense breakdowns and monthly comparisons using visual charts (line charts for monthly comparisons, pie charts for category breakdowns).
Responsive Design: Ensures the application is fully responsive with a modern UI using Tailwind CSS or Material UI.

Backend Development
User Authentication: Implements JWT-based authentication for secure login and registration. Role-based access control is added for admin and regular users.
CRUD Operations: Supports Create, Read, Update, and Delete (CRUD) operations for managing expenses.
Bulk Upload and Delete: Users can upload multiple expenses via CSV and delete multiple expenses at once.
Error Handling: Robust error handling is implemented for invalid requests, authentication errors, and server-side issues.
MongoDB Aggregations: Supports advanced queries and data aggregation for generating statistics such as total expenses per month and category breakdowns.

Full-Stack Integration
Frontend and Backend Integration: The frontend communicates with the backend via Axios for all operations, including user authentication, managing expenses, and generating reports.
CSV Upload: Bulk uploading of expenses via CSV is implemented and integrated between the frontend and backend.
Charts and Reports: Dynamic charts update in real time based on the data retrieved from the backend API, offering monthly comparisons and detailed category breakdowns.
Deployment: The frontend is deployed on Vercel or Netlify, and the backend is deployed on Heroku or Render.
Technologies Used
Frontend:
React.js: For building the dynamic user interface.
Tailwind CSS or Material UI: For responsive and modern UI design.
Recharts: For visualizing expense statistics and reports.
Axios: For making HTTP requests to the backend API.
Backend:
Node.js: For server-side JavaScript.
Express.js: Web framework for creating RESTful API endpoints.
MongoDB: NoSQL database for storing user and expense data.
Multer: Middleware for handling CSV file uploads.
JWT: For user authentication and role-based access control.
Bcrypt: For secure password hashing.
Installation
Prerequisites:
Node.js and npm installed on your machine.
A MongoDB instance (either local or cloud-based, such as MongoDB Atlas).
Vercel or Netlify account for frontend deployment.
Heroku or Render account for backend deployment.
