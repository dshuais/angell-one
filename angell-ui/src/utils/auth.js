import Cookies from "js-cookie";
import { TOKENKEY } from '../settings'
// const TOKENKEY = 'ds_react_demo_token'


export function getToken() {
  return Cookies.get(TOKENKEY)
}

export function setToken(token) {
  return Cookies.set(TOKENKEY, token)
}

export function removeToken() {
  return Cookies.remove(TOKENKEY)
}
