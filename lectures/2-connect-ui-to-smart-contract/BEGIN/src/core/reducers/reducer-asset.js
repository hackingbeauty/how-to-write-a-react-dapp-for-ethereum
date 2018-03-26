import constants from 'core/types'

const initialState = {
  stagedAsset: null,
  assetHash: '',
  alreadyExists: false,
  error: '',
  transaction: null,
  success: false
}

export function assetReducer(state = initialState, action) {
  switch (action.type) {

  case constants.ADD_ASSET:
    return Object.assign({}, state, {
      stagedAsset: action.asset[0]
    })

  case constants.CREATE_ASSET_HASH:
    return Object.assign({}, state, {
      assetHash: action.hash,
      success: action.success,
      transaction: action.transaction
    })

  case constants.CHECK_ASSET:
    return Object.assign({}, state, {
      assetHash: action.assetHash,
      alreadyExists: action.alreadyExists
    })

  case constants.ASSET_ERROR:
    return Object.assign({}, state, {
      error: action.error
    })

  case constants.CLEAR_ASSETS:
    return initialState

  default:
    return state
  }
}
