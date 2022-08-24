import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk' // 使redux内允许异步操作
import { composeWithDevTools } from 'redux-devtools-extension' // redux的开发者工具

// 统一遍历reduces下的所有redux reduces
const reducersFiles = require.context('./reducers', true, /\.js$/),
  reducersAll = reducersFiles.keys().reduce((reduces, reducersPath) => {
    const reducesName = reducersPath.replace(/^\.\/(.*)\.\w+$/, '$1'),
      value = reducersFiles(reducersPath)
    reduces[reducesName] = value.default
    return reduces
  }, {})

export default createStore(combineReducers(reducersAll), composeWithDevTools(applyMiddleware(thunk)))