import constants from 'core/types'

export function showModal(obj) {
  return {
    type: constants.SHOW_MODAL,
    title: obj.title,
    actions: obj.actions,
    content: obj.content,
    className: obj.className,
    customStyles: obj.customStyles
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

export function openRightNav() {
  return {
    type: constants.OPEN_RIGHT_NAV
  }
}

export function closeRightNav() {
  return {
    type: constants.CLOSE_RIGHT_NAV
  }
}

export function clear() {
  return {
    type: constants.CLEAR_UI
  }
}
