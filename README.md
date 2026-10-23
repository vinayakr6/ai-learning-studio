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
