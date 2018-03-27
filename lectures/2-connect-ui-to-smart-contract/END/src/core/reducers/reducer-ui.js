import constants from 'core/types'

const initialState = {
  leftNavOpen: false,
  rightNavOpen: false,
  modalState: {
    showModal: false,
    modalKey: ''
  }
}

export function uiReducer(state = initialState, action) {
  switch (action.type) {

  case constants.SHOW_MODAL:
    return Object.assign({}, state, {
      modalState: {
        showModal: true,
        modalKey: action.modalKey
      }
    })

  case constants.CLOSE_MODAL:
    return Object.assign({}, state, {
      modalState: {
        showModal: true,
        modalKey: ''
      }
    })

  case constants.OPEN_LEFT_NAV:
    return Object.assign({}, state, {
      leftNavOpen: true
    })

  case constants.CLOSE_LEFT_NAV:
    return Object.assign({}, state, {
      leftNavOpen: false
    })

  case constants.CLEAR_UI:
    return Object.assign({}, state, {
      initialState
    })

  default:
    return state
  }
}
