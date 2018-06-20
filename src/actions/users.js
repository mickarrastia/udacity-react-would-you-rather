import {saveQuestion, saveQuestionAnswer} from '../utils/api'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'
export const REMOVE_ANSWER = 'REMOVE_ANSWER'

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

function removeAnswer({authedUser, qid, answer}) {
  return {
    type: REMOVE_ANSWER,
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

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in saveQuestionAnswer: ', e)
        dispatch(removeAnswer(info))
        alert('The was an error saving the answer. Try again.')
      })
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
