declare type SubjectsApiType = {
  message: string;
  metadata: Metadata;
  subjects: Subject[];
};

declare type Subject = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string; // ISO date string
};

// declare type SubjectsArrayType = SubjectsApiType["subjects"];
