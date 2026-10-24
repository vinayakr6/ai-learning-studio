/* Virtual lab definitions and behaviour are kept separate from lesson rendering. */
window.LAB_DATA = {
  title: "Explore an AI workflow",
  description: "Change the example input, then step through a simplified input → processing → output workflow. This is a teaching simulation, not a live AI model.",
  inputs: [
    {value:"leaf",label:"Leaf image",detail:"A leaf photo is supplied as input.",process:"The simulated classifier compares visible features with example patterns.",output:"Possible result: 'leaf image classified'. This is not a real diagnosis."},
    {value:"email",label:"Email text",detail:"The text of an email is supplied as input.",process:"The simulated filter checks a few example clues such as urgent wording and repeated links.",output:"Possible result: 'review for spam'. A real filter uses a more complex model and can be wrong."},
    {value:"student",label:"Practice answers",detail:"A set of practice answers is supplied as input.",process:"The simulated learning tool compares answers with an answer key.",output:"Possible result: a practice score and feedback. The score is only as good as the answer key."}
  ],
  steps:[
    {name:"Input",icon:"⇢",short:"Provide relevant data"},
    {name:"Processing",icon:"✦",short:"Apply a model or method"},
    {name:"Output",icon:"✓",short:"Produce a result"}
  ]
};
