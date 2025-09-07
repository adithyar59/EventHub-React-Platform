Getting Started with Create React App
This project was bootstrapped with Create React App. Below are the scripts I actually used while building and testing EventHub, in simple terms.

Available Scripts
In the project directory:

npm start
Runs the app in development mode.

Opens http://localhost:3000 in the browser.

The page reloads when changes are saved, and lint errors (if any) show in the console.

npm test
Launches the test runner in watch mode.

Useful when adding unit tests.

npm run build
Creates an optimized production build in the build folder.

The build is minified and file names include hashes for caching.

Ready to deploy on static hosts like Netlify, Vercel, or GitHub Pages.

npm run eject
This is permanent and not required for this project.

It copies all configuration (Webpack, Babel, ESLint, etc.) so you can customize deeply.

Not recommended unless necessary.

Learn More
React documentation: https://reactjs.org/

Create React App docs: https://facebook.github.io/create-react-app/docs/getting-started

Notes from my setup:

I used Tailwind via CDN in public/index.html to keep setup simple.

State is managed with React hooks (useState, useMemo), so no extra state library was needed.

The goal was to keep the flow simple: discover event → register → check‑in → give feedback → view analytics (admin).
