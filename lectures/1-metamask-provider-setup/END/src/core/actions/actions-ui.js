import constants from 'core/types'

export function showModal(obj) {
  return {
    type: constants.SHOW_MODAL,
    modalKey: obj.modalKey
  }
}

export function closeModal() {
  return {
    type: constants.CLOSE_MODAL
  }
}

export function openLeftNav() {
  return {
    type: constants.OPEN_LEFT_NAV
  }
}

export function closeLeftNav() {
  return {
    type: constants.CLOSE_LEFT_NAV
  }
}

export function clear() {
  return {
    type: constants.CLEAR_UI
  }
}
