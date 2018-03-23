import constants from 'core/types'

export function setEmail(email) {
  return {
    type: constants.SET_ACCOUNT_EMAIL,
    email: email
  }
}


export function clear() {
  return {
    type: constants.CLEAR_ACCOUNT
  }
}
