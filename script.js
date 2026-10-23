const lessons = [
  {
    tag: "CORE CONCEPT",
    title: "What is Artificial Intelligence?",
    intro: "Artificial Intelligence (AI) is a field of computing focused on creating systems that perform tasks commonly associated with human intelligence, such as recognizing patterns, reasoning, learning, and making decisions.",
    analogy: "A navigation app uses road and traffic data to recommend a route to your destination.",
    points: [
      "AI systems are designed for specific tasks or goals.",
      "They may use rules, search, data, or learned patterns.",
      "AI outputs should be checked for errors and limitations."
    ]
  },
  {
    tag: "HOW IT WORKS",
    title: "How does AI work?",
    intro: "An AI system receives inputs, processes them using rules or a model, and produces an output. Machine-learning systems learn patterns from examples during training and use those patterns to make predictions on new inputs.",
    analogy: "A spam filter examines features of an email and estimates whether it is spam or a legitimate message.",
    points: [
      "Input data provides information for the system to process.",
      "An algorithm or model processes the input.",
      "The output may be a prediction, recommendation, classification, or generated response."
    ]
  },
  {
    tag: "REAL-WORLD USE",
    title: "Applications of AI",
    intro: "AI is used in many fields to assist people with pattern recognition, prediction, planning, and decision support. Its usefulness depends on the quality of data, the task, and how the system is evaluated.",
    analogy: "A medical image tool may flag an area for a clinician to review; the tool supports professional judgement rather than replacing it.",
    points: [
      "Healthcare: support for medical image analysis and patient monitoring.",
      "Transport: route planning, traffic prediction, and driver-assistance systems.",
      "Education: practice feedback, content recommendations, and learning support."
    ]
  }
];

const lessonTabs = [...document.querySelectorAll(".lesson-tab")];
let currentLesson = 0;

function showLesson(index) {
  currentLesson = Math.max(0, Math.min(index, lessons.length - 1));
  const lesson = lessons[currentLesson];
  document.getElementById("lesson-tag").textContent = lesson.tag;
  document.getElementById("lesson-title").textContent = lesson.title;
  document.getElementById("lesson-intro").textContent = lesson.intro;
  document.getElementById("lesson-analogy").textContent = lesson.analogy;
  document.getElementById("lesson-count").textContent = `Lesson ${currentLesson + 1} of ${lessons.length}`;
  const points = document.getElementById("lesson-points");
  points.replaceChildren(...lesson.points.map(text => {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
  }));
  lessonTabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === currentLesson);
    tab.setAttribute("aria-current", i === currentLesson ? "step" : "false");
  });
  document.getElementById("previous-lesson").disabled = currentLesson === 0;
  document.getElementById("next-lesson").textContent = currentLesson === lessons.length - 1 ? "Back to first lesson ↻" : "Next lesson →";
}
lessonTabs.forEach((tab, i) => tab.addEventListener("click", () => showLesson(i)));
document.getElementById("previous-lesson").addEventListener("click", () => showLesson(currentLesson - 1));
document.getElementById("next-lesson").addEventListener("click", () => showLesson(currentLesson === lessons.length - 1 ? 0 : currentLesson + 1));

const labSteps = [
  {symbol:"▤", kicker:"INPUT DATA", title:"The system receives information", description:"A spam filter receives an email's text, sender details, and links as input features."},
  {symbol:"⚙", kicker:"PROCESS", title:"The system looks for patterns", description:"A model or set of rules examines the available features and compares them with patterns learned or specified earlier."},
  {symbol:"✦", kicker:"OUTPUT", title:"The system returns a result", description:"The filter may classify the email as likely spam or not spam. A person or another system can review the result."}
];
let activeLabStep = 0;
function showLabStep(index) {
  activeLabStep = (index + labSteps.length) % labSteps.length;
  const step = labSteps[activeLabStep];
  document.getElementById("lab-symbol").textContent = step.symbol;
  document.getElementById("lab-kicker").textContent = step.kicker;
  document.getElementById("lab-title").textContent = step.title;
  document.getElementById("lab-description").textContent = step.description;
  document.getElementById("lab-progress").style.width = `${((activeLabStep + 1) / labSteps.length) * 100}%`;
  document.querySelectorAll(".workflow-step").forEach((button, i) => {
    button.classList.toggle("selected", i === activeLabStep);
    button.setAttribute("aria-pressed", i === activeLabStep ? "true" : "false");
  });
}
document.querySelectorAll(".workflow-step").forEach((button, i) => button.addEventListener("click", () => showLabStep(i)));
document.getElementById("run-lab").addEventListener("click", () => showLabStep(activeLabStep + 1));

const questions = [
  {q:"Which statement best describes Artificial Intelligence?", options:["A system that only stores files","Computing systems designed to perform tasks associated with intelligence","Any electronic device with a battery"], answer:1, explain:"AI is a field concerned with systems that perform tasks such as learning, reasoning, pattern recognition, or decision support."},
  {q:"What is a common first step in an AI workflow?", options:["Receive input data","Publish the final answer","Delete the model"], answer:0, explain:"A system receives input data before processing it and producing an output."},
  {q:"Which is an example of AI in transportation?", options:["A paper timetable","A basic light switch","A system that predicts traffic and recommends routes"], answer:2, explain:"Traffic prediction and route recommendations are common AI-enabled transportation applications."},
  {q:"What does a machine-learning model learn from during training?", options:["Examples or training data","The colour of the computer case","Nothing; it guesses randomly"], answer:0, explain:"Machine-learning training uses data to fit a model that can identify patterns relevant to a task."},
  {q:"Why should an AI output be checked?", options:["AI is always correct","AI can make errors or reflect limitations in its data and design","Checking makes the internet faster"], answer:1, explain:"AI systems can be inaccurate, biased, or unsuitable for a particular context, so outputs need appropriate evaluation."}
];

function renderQuestions() {
  const container = document.getElementById("questions");
  container.replaceChildren();
  questions.forEach((question, index) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "question";
    const legend = document.createElement("legend");
    const number = document.createElement("span");
    number.className = "question-number";
    number.textContent = String(index + 1).padStart(2, "0");
    legend.append(number, document.createTextNode(question.q));
    fieldset.append(legend);
    question.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "answer-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = String(optionIndex);
      input.required = true;
      label.append(input, document.createTextNode(option));
      fieldset.append(label);
    });
    container.append(fieldset);
  });
}
renderQuestions();

document.getElementById("quiz-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  let score = 0;
  const feedback = [];
  questions.forEach((question, index) => {
    const selected = Number(form.querySelector(`input[name="question-${index}"]:checked`).value);
    if (selected === question.answer) score++;
    feedback.push(`${index + 1}. ${selected === question.answer ? "Correct" : "Review"} — ${question.explain}`);
  });
  const percent = Math.round(score / questions.length * 100);
  const result = document.getElementById("quiz-result");
  result.hidden = false;
  result.classList.toggle("incorrect", percent < 60);
  result.replaceChildren();
  const heading = document.createElement("strong");
  heading.textContent = `Your score: ${score}/${questions.length} (${percent}%)`;
  const summary = document.createElement("p");
  summary.textContent = percent >= 80 ? "Excellent work! You have a good grasp of these fundamentals." : percent >= 60 ? "Good start. Review the feedback below and try again." : "Keep practising. Review the lessons and try again.";
  const list = document.createElement("ul");
  feedback.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.append(li);
  });
  result.append(heading, summary, list);
  result.scrollIntoView({behavior:"smooth", block:"nearest"});
});

document.getElementById("reset-quiz").addEventListener("click", () => {
  document.getElementById("quiz-form").reset();
  const result = document.getElementById("quiz-result");
  result.hidden = true;
  result.replaceChildren();
});

showLesson(0);
showLabStep(0);
