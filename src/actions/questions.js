export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const DEREGISTER_VOTE = 'DEREGISTER_VOTE'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
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


