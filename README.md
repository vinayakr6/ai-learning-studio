# AI Learning Studio

A beginner-friendly interactive teaching website built with plain HTML, CSS, and JavaScript. No build tools or database are required for the starter version.

## Features
- Three sample lessons for Introduction to AI and Applications
- Lesson navigation
- Interactive visual AI workflow demonstration
- Five-question quiz with scoring and explanations
- Responsive layout for desktop and mobile
- No API keys, login, or backend required

## Folder structure
```text
ai-learning-studio/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Run locally
1. Extract this folder.
2. Open `index.html` in a modern browser.
3. Try each lesson, run the visual lab, and submit the quiz.

For a more realistic local server, use Visual Studio Code with the Live Server extension, but it is not required for this project.

## Deploy on Netlify
### Option A: manual deploy
1. Sign in at https://app.netlify.com/.
2. Open the manual deployment / drag-and-drop option.
3. Upload the project folder or a ZIP containing `index.html`, `styles.css`, and `script.js`.
4. Open the URL Netlify provides.

### Option B: GitHub-connected deployment
1. Create a new GitHub repository, for example `ai-learning-studio`.
2. Upload these four files to the repository root.
3. In Netlify, choose **Add new site** / **Import an existing project** and connect GitHub.
4. Select the repository.
5. For this plain HTML project, leave the build command blank and set the publish directory to `.` (the repository root), if Netlify asks.
6. Deploy. Future pushes to the connected branch trigger deployments.

## Important limitations
- Quiz results exist only in the browser and are not shared with a teacher.
- There is no student login or secure data storage.
- The visual lab is a simplified educational simulation, not a live AI model.
- Google Fonts is loaded from an external service; the site still works if that request is unavailable, using fallback fonts.
- Netlify Free has usage limits and its plan details can change. Check https://www.netlify.com/pricing/ before deployment or scaling.

## Suggested next steps
1. Add more lessons aligned with the course syllabus.
2. Add question banks or let faculty load quizzes from a file.
3. Add a backend/database (for example Supabase or Firebase) when shared student progress, authentication, or a leaderboard is needed.
4. Keep secret API keys on a server-side function, never in browser JavaScript.

# AI Learning Studio — Version 2

A modular, static teaching application for an introductory AI course.

## Files
- `index.html` — app shell and navigation areas
- `styles.css` — responsive layout, cards, animation and accessibility styles
- `js/data.js` — module and lesson content
- `js/labs.js` — reusable virtual-lab examples and workflow steps
- `js/quizzes.js` — question bank, answer keys and explanations
- `js/app.js` — navigation, rendering, progress, lab and quiz behaviour

## Run locally
Open `index.html` in a modern browser. No build step or package installation is required. If your browser restricts local files, use VS Code with the Live Server extension or another local static server.

## Deploy to Netlify
1. Upload these files to the root of your GitHub repository, preserving the `js/` folder.
2. Commit and push changes.
3. In Netlify, set build command to blank and publish directory to `.`.
4. Deploy. Later pushes to the connected production branch trigger a new deployment.

## Add a lesson
Edit `js/data.js` and add a lesson object inside the appropriate module's `lessons` array. Keep the fields consistent with the existing examples: `id`, `title`, `duration`, `level`, `intro`, `objectives`, `sections`, `example`, `takeaway`. Give every lesson a unique `id`.

## Add a quiz question
Edit `js/quizzes.js` and append an object to `questions`. Provide a unique `id`, `question`, four `options`, a zero-based `answer` index, and a helpful `explanation`.

## Add a lab input
Edit `js/labs.js` and add an input object with a unique `value`, `label`, `detail`, `process`, and `output`.

## Current limitations
- Progress uses browser `localStorage` on the same device/browser; it is not a shared student record.
- Quiz scores are shown in the browser only and are not saved to a faculty dashboard.
- There is no authentication, faculty upload tool, database, or live AI model connection.
- The lab is a simulation and does not call an AI API.
- This version has no build dependencies. Do not put API keys or private student data in front-end files.

