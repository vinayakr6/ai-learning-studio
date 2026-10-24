(() => {
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const state = {view:"home", lessonId:null, moduleId:"m1", labStep:0, labInput:"leaf", quizSubmitted:false, quizAnswers:{}, completedLessons:readCompleted()};
  const views = {home:$("#homeView"),lesson:$("#lessonView"),lab:$("#labView"),quiz:$("#quizView")};
  function readCompleted(){try{return JSON.parse(localStorage.getItem("ails-completed")||"[]")}catch{return []}}
  function saveCompleted(){try{localStorage.setItem("ails-completed",JSON.stringify(state.completedLessons))}catch{}}
  function allLessons(){return COURSE_DATA.modules.flatMap(m=>m.lessons.map(l=>({...l,moduleId:m.id,moduleTitle:m.title,moduleNumber:m.number})))}
  function lessonById(id){return allLessons().find(l=>l.id===id)}
  function esc(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function show(view){state.view=view;Object.entries(views).forEach(([key,el])=>el.classList.toggle("hidden",key!==view));$$("[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===view));$("#sidebar").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");renderNav();window.scrollTo({top:0,behavior:"smooth"});$("#mainContent").focus({preventScroll:true})}
  function renderNav(){
    $("#moduleNav").innerHTML=COURSE_DATA.modules.map(m=>`<button class="nav-item ${state.view==="lesson"&&state.moduleId===m.id?"active":""}" data-module="${m.id}"><span>${m.number}</span>${esc(m.title)}</button>`).join("");
    const total=allLessons().length, done=state.completedLessons.length, pct=total?Math.round(done/total*100):0;
    $("#progressText").textContent=pct+"%";$("#progressBar").style.width=pct+"%";
    $("#lessonCount").textContent=`${total} lessons · ${done} completed`;
  }
  function renderHome(){
    $("#moduleCards").innerHTML=COURSE_DATA.modules.map(m=>`<button class="module-card" data-module-card="${m.id}"><span class="module-number">${m.number}</span><h3>${esc(m.title)}</h3><p>${esc(m.description)}</p><span class="card-bottom"><span>${m.lessons.length} lesson${m.lessons.length===1?"":"s"}</span><span>Explore module →</span></span></button>`).join("");
    renderNav();
  }
  function openModule(id){const m=COURSE_DATA.modules.find(x=>x.id===id);if(!m)return;state.moduleId=id;openLesson(m.lessons[0].id)}
  function openLesson(id){
    const l=lessonById(id);if(!l)return;state.lessonId=id;state.moduleId=l.moduleId;
    $("#lessonView").innerHTML=`<div class="page-header"><div class="breadcrumb">Modules / ${esc(l.moduleTitle)} / Lesson</div><p class="eyebrow">LESSON ${l.moduleNumber}</p><h1 class="page-title">${esc(l.title)}</h1><p class="page-subtitle">${esc(l.intro)}</p><div class="lesson-meta"><span class="pill">${esc(l.duration)}</span><span class="pill">${esc(l.level)}</span><span class="pill">${state.completedLessons.includes(l.id)?"Completed":"In progress"}</span></div></div>
      <div class="content-layout"><div><article class="panel"><h2>Lesson notes</h2>${l.sections.map(s=>`<h3>${esc(s.heading)}</h3><p>${esc(s.body)}</p>`).join("")}<div class="concept-callout"><b>Example</b><br>${esc(l.example)}</div><h3>Key takeaway</h3><p>${esc(l.takeaway)}</p></article><div class="lesson-nav"><button class="button button-outline" data-view="home">← All modules</button><button id="completeLesson" class="button button-primary">${state.completedLessons.includes(l.id)?"Completed ✓":"Mark as completed ✓"}</button></div><div class="lesson-nav"><button id="previousLesson" class="button button-outline">← Previous lesson</button><button id="nextLesson" class="button button-primary">Next lesson →</button></div></div><aside><div class="panel learning-outcomes"><h3>By the end, you can…</h3><ul>${l.objectives.map(o=>`<li>${esc(o)}</li>`).join("")}</ul></div><div class="panel"><h2>Try it out</h2><p>Test the idea in a short interactive lab or check your understanding with a quiz.</p><button class="button button-primary" data-view="lab">Open virtual lab →</button><button class="button button-outline" data-view="quiz" style="margin-top:8px">Take knowledge check</button></div></aside></div>`;
    show("lesson"); // render then restore lesson content visibility
    views.lesson.classList.remove("hidden");views.home.classList.add("hidden");
  }
  function renderLab(){
    const data=LAB_DATA, input=data.inputs.find(x=>x.value===state.labInput)||data.inputs[0];
    $("#labView").innerHTML=`<div class="page-header"><div class="breadcrumb">Practice zone / Virtual lab</div><p class="eyebrow">INTERACTIVE EXPERIMENT</p><h1 class="page-title">${esc(data.title)}</h1><p class="page-subtitle">${esc(data.description)}</p></div><div class="panel"><h2>1. Choose an input example</h2><div class="lesson-meta">${data.inputs.map(i=>`<button class="button ${state.labInput===i.value?"button-primary":"button-outline"}" data-lab-input="${i.value}">${esc(i.label)}</button>`).join("")}</div><div class="concept-callout">${esc(input.detail)}</div><h2 style="margin-top:25px">2. Step through the workflow</h2><div class="lab-steps">${data.steps.map((s,i)=>`<button class="lab-step ${i===state.labStep?"active":""} ${i<state.labStep?"done":""}" data-lab-step="${i}"><span class="step-icon">${s.icon}</span><b>${esc(s.name)}</b><small>${esc(s.short)}</small></button>`).join("")}</div><div class="lab-controls"><button id="labBack" class="button button-outline" ${state.labStep===0?"disabled":""}>← Previous step</button><button id="labNext" class="button button-primary" ${state.labStep===2?"disabled":""}>Next step →</button><button id="labReset" class="button button-outline">Reset experiment</button></div><div class="lab-output" aria-live="polite"><strong>${esc(data.steps[state.labStep].name)}</strong>${esc(state.labStep===0?input.detail:state.labStep===1?input.process:input.output)}</div></div><div class="panel"><h2>Reflect</h2><p>What could cause this system's result to be wrong? Consider input quality, missing examples, bias, or how the output is evaluated.</p><button class="button button-primary" data-view="quiz">Check my understanding →</button></div>`;
  }
  function renderQuiz(){
    const q=QUIZ_DATA.questions;
    $("#quizView").innerHTML=`<div class="page-header"><div class="breadcrumb">Practice zone / Knowledge check</div><p class="eyebrow">RECALL & APPLY</p><h1 class="page-title">${esc(QUIZ_DATA.title)}</h1><p class="page-subtitle">${esc(QUIZ_DATA.description)}</p></div><form id="quizForm">${q.map((item,i)=>`<fieldset class="quiz-question" style="border:1px solid var(--line)"><legend class="question-number">QUESTION ${i+1} OF ${q.length}</legend><h3>${esc(item.question)}</h3>${item.options.map((o,j)=>`<label class="answer-option"><input type="radio" name="${item.id}" value="${j}" ${state.quizAnswers[item.id]===j?"checked":""} ${state.quizSubmitted?"disabled":""}><span>${esc(o)}</span></label>`).join("")}${state.quizSubmitted?`<div class="feedback ${state.quizAnswers[item.id]===item.answer?"good":"bad"}">${state.quizAnswers[item.id]===item.answer?"Well done! ":"Review this one. "}${esc(item.explanation)}</div>`:""}</fieldset>`).join("")}${state.quizSubmitted?`<div class="quiz-result"><p class="eyebrow">YOUR RESULT</p><strong>${q.filter(item=>state.quizAnswers[item.id]===item.answer).length} / ${q.length}</strong><p>You can retry to practise again. Your result is not uploaded to a server.</p><button type="button" id="retryQuiz" class="button button-primary">Try again</button></div>`:`<button class="button button-primary" type="submit">Submit answers →</button>`}</form>`;
  }
  document.addEventListener("click",e=>{
    const viewBtn=e.target.closest("[data-view]");if(viewBtn){const v=viewBtn.dataset.view;if(v==="lab")renderLab();if(v==="quiz")renderQuiz();show(v);return}
    const moduleBtn=e.target.closest("[data-module]");if(moduleBtn){openModule(moduleBtn.dataset.module);return}
    const card=e.target.closest("[data-module-card]");if(card){openModule(card.dataset.moduleCard);return}
    const lessonLink=e.target.closest("[data-lesson]");if(lessonLink){openLesson(lessonLink.dataset.lesson);return}
    const inputBtn=e.target.closest("[data-lab-input]");if(inputBtn){state.labInput=inputBtn.dataset.labInput;state.labStep=0;renderLab();return}
    const stepBtn=e.target.closest("[data-lab-step]");if(stepBtn){state.labStep=Number(stepBtn.dataset.labStep);renderLab();return}
    if(e.target.closest("#labNext")){state.labStep=Math.min(2,state.labStep+1);renderLab();return}
    if(e.target.closest("#labBack")){state.labStep=Math.max(0,state.labStep-1);renderLab();return}
    if(e.target.closest("#labReset")){state.labStep=0;state.labInput="leaf";renderLab();return}
    if(e.target.closest("#completeLesson")){if(!state.completedLessons.includes(state.lessonId)){state.completedLessons.push(state.lessonId);saveCompleted()}openLesson(state.lessonId);return}
    if(e.target.closest("#previousLesson")||e.target.closest("#nextLesson")){const ls=allLessons(),idx=ls.findIndex(l=>l.id===state.lessonId),next=e.target.closest("#nextLesson")?Math.min(ls.length-1,idx+1):Math.max(0,idx-1);openLesson(ls[next].id);return}
    if(e.target.closest("#retryQuiz")){state.quizSubmitted=false;state.quizAnswers={};renderQuiz();return}
    if(e.target.closest("#continueBtn")){const next=allLessons().find(l=>!state.completedLessons.includes(l.id))||allLessons()[0];openLesson(next.id);return}
  });
  document.addEventListener("change",e=>{if(e.target.matches('#quizForm input[type="radio"]'))state.quizAnswers[e.target.name]=Number(e.target.value)});
  document.addEventListener("submit",e=>{if(e.target.id==="quizForm"){e.preventDefault();const unanswered=QUIZ_DATA.questions.filter(q=>state.quizAnswers[q.id]===undefined);if(unanswered.length){alert(`Please answer all ${QUIZ_DATA.questions.length} questions before submitting.`);return}state.quizSubmitted=true;renderQuiz()}});
  $("#menuToggle").addEventListener("click",()=>{const open=$("#sidebar").classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open))});
  renderHome();
})(); 
