export type SurveyQuestionType =
  | 'Single Select'
  | 'Multiple Select'
  | 'Matrix Uni choice'
  | 'Text'
  | 'NPS'
  | 'Rank order';

export interface SurveyQuestion {
  id: number;
  surveyId: number;
  code: string;
  text: string;
  type: SurveyQuestionType;
  hasSubQuestions?: boolean;
}

const DEMO_QUESTIONS: Omit<SurveyQuestion, 'id' | 'surveyId'>[] = [
  { code: 'Q1', text: 'What is your age group?', type: 'Single Select' },
  {
    code: 'Q2',
    text: 'Which district of West Bengal do you reside in?',
    type: 'Single Select',
  },
  {
    code: 'Q2',
    text: 'How would you rate the performance of the current West Bengal state government?',
    type: 'Matrix Uni choice',
    hasSubQuestions: true,
  },
  {
    code: 'Q3',
    text: 'Which sports do you follow regularly?',
    type: 'Multiple Select',
  },
  {
    code: 'Q4',
    text: 'How likely are you to recommend this service to a friend or colleague?',
    type: 'NPS',
  },
  {
    code: 'Q5',
    text: 'Please rank the following factors in order of importance.',
    type: 'Rank order',
  },
  {
    code: 'Q6',
    text: 'What is your overall satisfaction with the product?',
    type: 'Single Select',
  },
  {
    code: 'Q7',
    text: 'Any additional comments or feedback?',
    type: 'Text',
  },
  {
    code: 'Q8',
    text: 'How often do you use online streaming services?',
    type: 'Single Select',
  },
  {
    code: 'Q9',
    text: 'Select all media channels you use weekly.',
    type: 'Multiple Select',
  },
  {
    code: 'Q10',
    text: 'Rate each brand on quality and value.',
    type: 'Matrix Uni choice',
    hasSubQuestions: true,
  },
];

function buildQuestionsForSurvey(surveyId: number): SurveyQuestion[] {
  return DEMO_QUESTIONS.map((question, index) => ({
    ...question,
    id: surveyId * 100 + index + 1,
    surveyId,
  }));
}

const questionsBySurvey = new Map<number, SurveyQuestion[]>();

export function getQuestionsBySurvey(surveyId: number): SurveyQuestion[] {
  if (!questionsBySurvey.has(surveyId)) {
    questionsBySurvey.set(surveyId, buildQuestionsForSurvey(surveyId));
  }
  return questionsBySurvey.get(surveyId) ?? [];
}
