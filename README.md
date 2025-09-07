# Campus-Event-Management-Platform
Campus Drive Assignment – Webknot Technologies

## EventHub – Campus Event Platform

EventHub is a simple React app that helps students find campus events, register quickly, and keep track of what they're attending. There's also an admin view with basic analytics like attendance and feedback, so organizers can see what's working well.

## Features

### Student
- **Event discovery**: Browse upcoming events with clear details like date, venue, and type.
- **One‑click registration**: Register without extra steps or confusion.
- **Personal dashboard**: See all registered events in one place.
- **Check‑in**: Mark attendance during the event.
- **Feedback**: Rate events with a 5‑star system after attending.

### Admin
- **Analytics dashboard**: Check event popularity and participation.
- **Student engagement**: Track how actively students participate.
- **Event performance**: View attendance and average feedback.
- **Top students**: See the most active participants.

## Tech Stack
- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Custom SVG components
- **State**: React useState and useMemo
- **Build**: Create React App

## Quick Start

**Clone the repo**
```bash
git clone https://github.com/adithyar59/Campus-Event-Management-Platform.git
cd Campus-Event-Management-Platform
```

**Install dependencies**
```bash
npm install
```

**Start development server**
```bash
npm start
```
Opens http://localhost:3000

**Build for production**
```bash
npm run build
```

## Screenshots
Visual demonstration of the EventHub platform features:

📸 **See the application in action**: Check out the [`Report Screenshots/`](./Report%20Screenshots/) folder for visual documentation of:
- Student event browsing interface
- Event registration and management
- Admin analytics dashboard  
- Responsive mobile design

## Project Structure
```
src/
  ├── App.jsx          # Main app component
  ├── index.js         # Entry point
  └── index.css        # Global styles
public/
  ├── index.html       # Includes Tailwind CDN
  └── assets/          # Static files
```

## Design Choices
- **Glassmorphism UI** with a clean dark theme for a modern, focused look.
- **Fully responsive** layout for both mobile and desktop.
- **Smooth hover and transition effects** to guide interactions.
- **Subtle background visuals** to keep attention on event content.

## Demo Data
- Preloaded sample events (hackathons, workshops, seminars, fests).
- A few student profiles with different activity levels.
- Registration, check‑in, and feedback examples to demo the full flow.
- Basic analytics using mock data (no backend required yet).

## Deployment
Works on **Netlify** (netlify.toml included), **Vercel**, **GitHub Pages**, or any static host.

Build the project and deploy the generated production bundle.

## Notes and Next Steps
This version focuses on the front‑end experience with mock data to show the user journey end‑to‑end.

**Future improvements**: authentication, a backend for persistence, role‑based access, and real‑time updates for registrations and check‑ins.
