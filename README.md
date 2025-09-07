Campus-Event-Management-Platform

Campus Drive Assignment – Webknot Technologies

EventHub – Campus Event Platform

EventHub is a minimal React application that facilitates students in locating campus events, swift registration, and keeping track of the events they attend. Consequently, there is also an admin view featuring rudimentary analytics such as attendance and feedback, thus, organizers have a chance to check what is going well by observing the trends.

Features

Student

Event discovery: Discover upcoming events with accurate and understandable details such as date, venue, and type.

One‑click registration: Register without any additional steps or confusion.

Personal dashboard: Get an overview of all the events that you have registered in one place.

Check‑in: Attain marking attendance during the event.

Feedback: Rate events with a 5‑star system after attending.

Admin

Analytics dashboard: Measure the popularity of the events and their participation.

Student engagement: Get data on how actively students participate.

Event performance: Show both attendance and average feedback with the help of graphs and statistics.

Top Students: Access the most active participants of the event/study group.

Tech Stack

Frontend: React 18 with Hooks

Styling: Tailwind CSS (via CDN)

Icons: Custom SVG components

State: React useState and useMemo

Build: Create React App

Quick Start

Clone the repo

git clone https://github.com/adithyar59/Campus-Event-Management-Platform.git

cd Campus-Event-Management-Platform

Install dependencies

npm install

Start development server

npm start

Opens http://localhost:3000

Build for production

npm run build

Project Structure

src/

App.jsx – Main app component

index.js – Entry point

index.css – Global styles

public/

index.html – Includes Tailwind CDN

assets/ – Static files

Design Choices

Glassmorphism UI with a slick dark-theme for a modern, clean, and focused look.

Fully responsive layout for both mobile and desktop.

Smooth transition and hover effects to guide interactions.

Subtle background visuals to keep attention on event content.

Demo Data

Preloaded sample events (hackathons, workshops, seminars, fests).

A few student profiles with different activity levels.

Examples of registration, check-in, and feedback to demonstrate the complete flow.

Basic analytics by using mock data (no backend needed for the time being).

Deployment

Netlify (netlify.toml included), Vercel, GitHub Pages, or any other static hosting services can run the program.

You build the project and upload the generated production bundle to the server.

Notes and Next Steps

This version mainly highlights the front-end experience with mock data to depict the user flow from beginning to end.

The improvements in the future: authentication, backend for storage, role-based access, and real-time updates for registrations and check-ins.
