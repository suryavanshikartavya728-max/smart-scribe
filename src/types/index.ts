export interface Institute {
  id: string;
  name: string;
  logo: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  professor: string;
  courseName?: string;
  courseCode?: string;
  semester?: string;
  academicYear?: string;
  materials?: MaterialSet;
}

export interface GeneratedContent {
  lectureNumber: string;
  date: string;
  audioFile: string;
  videoFile: string;
}

export interface MaterialSet {
  slides: Array<{ name: string; lectureNumber: string; date: string; url?: string }>;
  audio: string | null;
  video: string | null;
  generatedContent: GeneratedContent[];
}

export interface ProfessorDoubt {
  id: string;
  courseId: string;
  studentName: string;
  question: string;
  date: string;
  reply?: string | null;
}

export interface Lecture {
  id: string;
  number: number;
  date: string;
  topic: string;
  courseId: string;
}

/* ------------------ UPDATED SECTION STARTS HERE ------------------ */

export interface Animation {
  code: string;
  title: string;
  video: string | null;
  duration: string;
}

export interface ContentData {
  topic: string;
  details: string;
  question: string;
  animations: Animation[];
  book_references: string[];
}


//   id text not null,
//   lecture_id text not null,
//   topic text not null,
//   definition text null,
//   recording_url text null,
//   book_reference text null,
//   content_data jsonb not null,
//   created_at timestamp with time zone null default now(),
//   updated_at timestamp with time zone null default now(),
//   constraint lecture_content_pkey primary key (id),
//   constraint lecture_content_lecture_id_key unique (lecture_id),
//   constraint fk_lecture foreign KEY (lecture_id) references lectures (id) on delete CASCADE
// ) TABLESPACE pg_default;

export interface LectureContent {
  id: string;
  lecture_id: string;
  topic: string;                                              
  definition: string;
  recording_url: string;
  book_reference: string;
  content_data: ContentData[];
}

/* ------------------ UPDATED SECTION ENDS HERE ------------------ */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface LectureProcessing {
  id: string;
  lectureId: string;
  status: 'uploading' | 'processing' | 'generating' | 'completed';
  audioFile?: string;
  videoFile?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Slide {
  id: string;
  lectureId: string;
  fileName: string;
  filePath: string;
  uploadDate: string;
}
