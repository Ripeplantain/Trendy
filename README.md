# Social Media Application with React and Django

![1696492173124](image/README/1696492173124.png)

## Project Overview

This project is a social media application that combines the power of React for the frontend and Django for the backend. The application includes essential social media features such as sending posts, uploading images, user authentication (login/register), commenting, liking posts, and an option for both light and dark mode. Additionally, it supports real-time chatting functionality.

## Technologies Used

- [ ] React: Frontend development
- [ ] Django: Backend development
- [ ] JavaScript: Programming language for frontend
- [ ] Python: Programming language for backend
- [ ] Redux: State management for React application
- [ ] WebSocket: Real-time communication for chatting
- [ ] PostgreSQL: Database for storing application data
- [ ] Tailwind CSS: For styling
- [ ] Redux: For cacheing

## Features

### 1. User Authentication (Login/Register)

- Users can create new accounts by registering with their email and password.
- Existing users can log in using their credentials.

### 2. Sending Posts

- Users can create and send posts, including text and images.
- Posts are displayed in a feed for other users to view.

### 3. Uploading Images

- Users can upload images along with their posts.

### 4. Commenting

- Users can comment on posts, engaging in discussions with other users.

### 5. Likes

- Users can like posts to show their appreciation for the content.

### 6. Light and Dark Mode

- The application offers both light and dark mode to suit users' preferences.

### 7. Chat Functionality

- Users can engage in real-time chatting with other users.
- WebSocket is utilized for live updates in the chat.

## Setup Instructions

### Prerequisites

- Node.js and npm for React development
- Python and pip for Django development
- PostgreSQL database

### Steps

1. Clone the repository to your local machine:

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```
2. Set up the Django backend:

   - Create a virtual environment and activate it:

     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```
   - Install the required Django dependencies:

     ```bash
     pip install -r requirements.txt
     ```
   - Run Django migrations and start the backend server:

     ```bash
     python manage.py migrate
     python manage.py runserver
     ```
3. Set up the React frontend:

   - Navigate to the `frontend` directory:

     ```bash
     cd frontend
     ```
   - Install the necessary packages:

     ```bash
     npm install
     ```
   - Start the React development server:

     ```bash
     npm start
     ```
4. Access the application:

   - Open your web browser and go to `http://localhost:5173` to use the application.

## Contributors

- [Emmanuel Gyang](mailto:irvingmanny@gmail.com)

## License

This project is licensed under the [MIT License](LICENSE).
