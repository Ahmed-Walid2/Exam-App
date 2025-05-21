declare type ExamApiType = {
  message: string;
  metadata: Metadata;
  exams: Exam[];
};

declare type Exam = {
  _id: string; // Should be extended
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};
