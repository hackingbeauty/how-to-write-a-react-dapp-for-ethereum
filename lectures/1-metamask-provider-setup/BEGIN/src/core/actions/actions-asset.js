import constants        from 'core/types'

export function addAsset(asset) {
  return {
    type: constants.ADD_ASSET,
    asset: asset
  }
}

export function clear() {
  return {
    type: constants.CLEAR_ASSETS
  }
}
