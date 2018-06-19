import {RECEIVE_QUESTIONS, DEREGISTER_VOTE} from '../actions/questions'
import {ANSWER_QUESTION, ADD_QUESTION} from '../actions/users'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      }
    case DEREGISTER_VOTE:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.filter((user) => user !== action.authedUser)
          }
        }
      }

    default :
      return state
  }
}
