import { combineReducers } from 'redux'
import { accountReducer }  from 'core/reducers/reducer-account'
import { assetReducer }    from 'core/reducers/reducer-asset'
import { uiReducer }       from 'core/reducers/reducer-ui'
import { providerReducer } from 'core/reducers/reducer-provider'

const rootReducer = combineReducers({
  account: accountReducer,
  asset: assetReducer,
  ui: uiReducer,
  provider: providerReducer
})

export default rootReducer
