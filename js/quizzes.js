/* Add questions using this format to extend the reusable quiz bank. */
window.QUIZ_DATA = {
  title: "AI foundations knowledge check",
  description: "Answer all five questions. Submit to see your score and explanations.",
  questions: [
    {id:"q1",question:"Which statement best describes artificial intelligence?",options:["A field focused on systems performing tasks associated with human intelligence","A single programming language used for every intelligent system","A guarantee that computers never make mistakes","A type of computer hardware only"],answer:0,explanation:"AI is a broad field that includes methods for tasks such as recognition, prediction and language processing."},
    {id:"q2",question:"In a simplified AI workflow, what normally happens after relevant input is provided?",options:["The system always knows the truth","The input is processed to produce a result","The data is automatically deleted","The output is guaranteed to be correct"],answer:1,explanation:"A model or method processes the input and produces an output that should then be evaluated."},
    {id:"q3",question:"Why should an AI output be evaluated?",options:["Every AI system uses identical data","Evaluation makes a model infallible","Outputs can be incorrect or unsuitable for the task","Evaluation is only needed for images"],answer:2,explanation:"AI systems can make errors, so outputs need to be checked against task requirements and evidence."},
    {id:"q4",question:"Which is an example of an AI application?",options:["A blank notebook","A fixed light switch with no sensing or learning","A paper clip","A system that analyses speech to produce a transcript"],answer:3,explanation:"Speech recognition is a common AI task; the other examples do not by themselves demonstrate an AI task."},
    {id:"q5",question:"Which prompt is most specific and easiest to evaluate?",options:["Tell me everything","Explain AI to a first-year student in 100 words and give two examples","Do something interesting","AI please"],answer:1,explanation:"The prompt identifies the task, audience, length and number of examples, making the requested output clearer."}
  ]
};
