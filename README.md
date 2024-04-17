# University Course Calendar Manager

This application is designed for university students to manage and display course events from `.ics` files, including handling recurring events.

## Features

- Upload and parse `.ics` files
- Display all events, including recurring events based on `RRULE`
- A modern, responsive front-end interface
- A backend service capable of handling file uploads and event parsing

## Technology Stack

- **Frontend**: React, FullCalendar, Axios
- **Backend**: Node.js, Express, ical.js

## Installation Guide

### Backend Setup

1. Clone the repository locally:

   ```
   git clone https://github.com/your-username/your-repository-name.git
   ```

2. Navigate to the backend folder:

   ```
   cd path/to/your-backend-folder
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the backend service:

   ```
   node server.js
   ```

### Frontend Setup

1. Navigate to the frontend folder:

   ```
   cd path/to/your-frontend-folder
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

## Usage Instructions

1. Open `http://localhost:3000` in a browser to access the frontend application.
2. Upload an `.ics` file through the interface. Upon successful upload, course events will be displayed on the calendar.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request


Make sure to replace `your-username/your-repository-name`

and `path/to/your-backend-folder` and `path/to/your-frontend-folder` with the actual paths to your repositories or the local directories where you have the backend and frontend code.
