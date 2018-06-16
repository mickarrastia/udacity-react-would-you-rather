import {getInitialData, saveQuestionAnswer} from '../utils/api'
import {receiveUsers, answerQuestion} from './users'
import {receiveQuestions, registerVote} from './questions'
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

