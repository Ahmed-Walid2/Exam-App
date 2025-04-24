declare type Question = {
  answers: {
    answer: string;
    key: string;
  }[];
  type: "single_choice";
  _id: string;
  question: string;
  correct: string;
  subject: Subject;
  exam: Exam;
};
