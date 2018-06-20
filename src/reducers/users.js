import {RECEIVE_USERS, ANSWER_QUESTION, ADD_QUESTION, REMOVE_ANSWER} from '../actions/users'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([action.question.id])
        }
      }
    case REMOVE_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: Object.keys(state[action.authedUser].answers).reduce((acc, key) => {
            if (key !== action.qid) {
              return {...acc, [key]: state[action.authedUser].answers[key]}
            }
            return acc;
          }, {})
        }
      }
    default :
      return state
  }
}
