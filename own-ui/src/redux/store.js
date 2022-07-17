import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducersFiles = require.context('./reducers', true, /\.js$/),
  reducersAll = reducersFiles.keys().reduce((reduces, reducersPath) => {
    const reducesName = reducersPath.replace(/^\.\/(.*)\.\w+$/, '$1'),
      value = reducersFiles(reducersPath)
    reduces[reducesName] = value.default
    return reduces
  }, {})

export default createStore(combineReducers(reducersAll), composeWithDevTools(applyMiddleware(thunk)))