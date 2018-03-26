import constants        from 'core/types'
import contract         from 'truffle-contract'
import ProofOfExistence from 'contracts/ProofOfExistence.json'
import sha256           from 'sha256'

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

export function checkIfRegistered(assetUrl) {
  alert('Check if the photo asset already exists on the Blockchain')
}
