import { SET_LANGUAGE } from 'actions'
import switch_language from '../locale'

const InitialState = {
  language: switch_language()
}

export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: switch_language(action.language)
      }
    default:
      return state
  }
}