import {saveQuestion, saveQuestionAnswer} from '../utils/api'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

function answerQuestion({authedUser, qid, answer}) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAnswer(info) {
  return (dispatch) => {
    dispatch(answerQuestion(info))

    // TODO: This should catch any possible errors and return the store to it's original unanswered state
    return saveQuestionAnswer(info)
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const {authedUser} = getState()

    return saveQuestion({optionOneText, optionTwoText, author: authedUser})
      .then((question) => {
        dispatch(addQuestion(question))
      })
  }
}
