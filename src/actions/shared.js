import {getInitialData, saveQuestionAnswer, saveQuestion} from '../utils/api'
import {receiveUsers, answerQuestion, assignUserQuestion} from './users'
import {receiveQuestions, registerVote, addQuestion} from './questions'
import {setAuthedUser} from './authedUser'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
      })
  }
}

export function handleAnswer(info) {
  return (dispatch) => {
    dispatch(answerQuestion(info))
    dispatch(registerVote(info))

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
        dispatch(assignUserQuestion(question.author, question.id))
      })
  }
}

