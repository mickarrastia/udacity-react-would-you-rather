export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const REGISTER_VOTE = 'REGISTER_VOTE'
export const DEREGISTER_VOTE = 'DEREGISTER_VOTE'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function registerVote({authedUser, qid, answer}) {
  return {
    type: REGISTER_VOTE,
    authedUser,
    qid,
    answer
  }
}

export function deregisterVote({authedUser, qid, previousAnswer}) {
  return {
    type: DEREGISTER_VOTE,
    authedUser,
    qid,
    answer: previousAnswer
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}
