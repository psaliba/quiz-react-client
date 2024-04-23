import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";

export type Course = {
  _id: string; // Mongo object id (this was the wrong one @Peter)
  id: number; // real course id should be used
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  number: string;
};

export type Quiz = {
  _id: string;
  course_id: string;
  title: string;
  description: string;
  published: boolean;
  available: Date;
  available_until: Date;
  due: Date;
  quiz_type: string;
  points: Number;
  assignment_group: string;
  shuffle_answers: boolean;
  time_limit: number;
  multiple_attempts: boolean;
  show_correct_answers: string;
  access_code: string;
  one_question_at_a_time: boolean;
  webcam_required: boolean;
  lock_questions_after_answering: boolean;
  questions: Question[];
};

export type Question = {
  type: string;
  points: number;
  question: string;
  options: Option[];
  correct_option: number;
};

export type Option = {
  option: string;
};

export const db = { courses, modules, assignments };
