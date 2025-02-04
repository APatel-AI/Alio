# Alio - Habit Tracking Application

A minimalistic habit tracking application built with Spring Boot and React.

## Features

- Create and track daily habits with descriptions
- Toggle habit completion for any date
- Streak tracking (current and longest streaks)
- Habit stacking (chain habits together)
- Categories and tags for organization
- Priority levels for habits
- Daily reminders with time settings
- Dark theme interface
- Week-by-week habit tracking view
- Responsive design
- Visual indicators for current day
- Priority-based sorting

## Prerequisites

- Java 17 or higher
- Node.js 14 or higher
- Maven 3.6 or higher

## Project Structure

```
alio/
├── backend/         # Spring Boot backend
├── frontend/        # React frontend
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies and build:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on http://localhost:8080

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on http://localhost:3000

## API Endpoints

- `GET /api/habits` - Get all habits
- `POST /api/habits` - Create a new habit
- `POST /api/habits/{id}/toggle?date={date}` - Toggle habit completion for a specific date

## Database

The application uses H2 in-memory database. The H2 console is available at http://localhost:8080/h2-console with these credentials:
- JDBC URL: `jdbc:h2:mem:aliodb`
- Username: `sa`
- Password: ` ` (empty)

## Technologies Used

- Backend:
  - Spring Boot 3.2
  - Spring Data JPA
  - H2 Database
  - Java 17

- Frontend:
  - React 18
  - Tailwind CSS
  - Axios
  - date-fns
  - lucide-react

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/feature-name`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/feature-name`
5. Submit a pull request
