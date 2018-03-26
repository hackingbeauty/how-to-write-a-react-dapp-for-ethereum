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

function checkIfAssetRegistered(ProofOfExContract, assetHash, resolve, reject) {
  ProofOfExContract.deployed().then((poe) => {
    return poe.checkIfRegistered(assetHash)
  })
  .then((exists) => {
    const assetExists = exists ? true : false
    resolve(assetExists)
  })
  .catch((error) => {
    reject(error)
  })
}

function registerAsset(ProofOfExContract, assetHash, resolve, reject) {
  ProofOfExContract.deployed().then((poe) => {
    return poe.registerAsset(assetHash)
  })
  .then(result => {
    const transaction = (result !== null) ? result : null
    resolve(transaction)
  })
  .catch((error) => {
    reject(error)
  })
}

function dispatchAssetAlreadyExists(dispatch) {
  dispatch((() => {
    return {
      type: constants.CHECK_ASSET,
      alreadyExists: true
    }
  })())
}

function dispatchAssetDoesNotExist(assetHash, dispatch) {
  dispatch((() => {
    return {
      type: constants.CHECK_ASSET,
      alreadyExists: false,
      assetHash: assetHash
    }
  })())
}

function dispatchAssetCreated(transaction, assetHash, dispatch) {
  dispatch((() => {
    return {
      type: constants.CREATE_ASSET_HASH,
      assetHash: assetHash,
      transaction: transaction,
      success: true
    }
  })())
}

function dispatchCreationError(dispatch) {
  dispatch((() => {
    return {
      type: constants.CREATE_ASSET_HASH,
      success: false
    }
  })())
}

function dispatchError(error, dispatch) {
  dispatch((() => {
    return {
      type: constants.ASSET_ERROR,
      error: error
    }
  })())
}

export function checkIfRegistered(assetUrl) {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    const ProofOfExContract = contract(ProofOfExistence)
    const assetHash = sha256(assetUrl)

    ProofOfExContract.setProvider(web3Provider.currentProvider)
    ProofOfExContract.defaults({from: web3Provider.eth.defaultAccount})

    return new Promise((resolve, reject) => {
      checkIfAssetRegistered(ProofOfExContract, assetHash, resolve, reject)
    })
    .then((assetExists) => {
      if (assetExists) {
        dispatchAssetAlreadyExists(dispatch)
      } else {
        dispatchAssetDoesNotExist(assetHash, dispatch)
      }
    })
    .catch((error) => {
      dispatchError(error, dispatch)
    })
  }
}

export function register() {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    const { assetHash } = getState().asset
    const ProofOfExContract = contract(ProofOfExistence)

    ProofOfExContract.setProvider(web3Provider.currentProvider)
    ProofOfExContract.defaults({from: web3Provider.eth.defaultAccount})

    return new Promise((resolve, reject) => {
      registerAsset(ProofOfExContract, assetHash, resolve, reject)
    })
    .then((transaction) => {
      if (transaction) {
        dispatchAssetCreated(transaction, assetHash, dispatch)
      } else {
        dispatchCreationError(dispatch)
      }
    })
  }
}
