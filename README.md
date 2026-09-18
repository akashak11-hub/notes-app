# Notes App — MERN CRUD Lab

## Candidate Details
- Name: Akash
- Roll Number: 2026201050
- GitHub Repo: <add your repo link here>

## Tech Stack
- **Backend:** Node.js, Express, Mongoose, MongoDB
- **Frontend:** React (Vite), Axios

## Project Structure
```
notes-app/
|-- server/    # Express + MongoDB backend
|-- client/    # Vite + React frontend
```

## Prerequisites
- Node.js installed
- MongoDB running locally on `mongodb://localhost:27017`

## Setup & Run

### 1. Backend
```bash
cd server
npm install
npm start
```
Server runs on `http://localhost:5000`.

### 2. Frontend
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`.

## API Endpoints
| Method | Endpoint          | Description                     |
|--------|-------------------|----------------------------------|
| POST   | /api/notes        | Create a new note (201 Created)  |
| GET    | /api/notes        | Get all notes, newest first      |
| DELETE | /api/notes/:id    | Delete a note by id (200 / 404)  |

## Notes
- CORS is enabled on the server for `http://localhost:5173`.
- `createdAt` defaults to the current timestamp on note creation.
- The UI shows a loading indicator while fetching and a "No notes yet — add one above!" message when the list is empty.

## Screenshots
Add the following to `screenshots/`:
- `ui-preview.png` — browser view with at least two notes rendered
- `delete-action.png` — browser view after deleting a note, with DevTools Network tab showing the `200 OK` DELETE response
