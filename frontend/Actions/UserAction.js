import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage'
import { apiurl, host } from '../utils/config'

export const UserLogin = (form) => async (dispatch, getState) => {
  try {
    const response = await fetch(`${host}/login`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await response.json()
    // await AsyncStorage.setItem("authorization", response.headers["Authorization"])
    console.log(data)
    console.log(response.headers)
    console.log(response.headers.map['authorization'])
    await AsyncStorage.setItem('token', response.headers.map['authorization'])

    console.log(data)
    dispatch({
      type: 'login',
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: 'user_error',
      payload: err,
    })
  }
}
export const UserRegister = (form) => async (dispatch, getState) => {
  try {
    const response = await fetch(`${apiurl}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await response.json()
    console.log(response.headers)
    await AsyncStorage.setItem('token', response.headers.map['authorization'])
    console.log(response.headers.map['authorization'])

    console.log(data)
    dispatch({
      type: 'login',
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: 'user_error',
      payload: err,
    })
  }
}

export const changePasswordFunction = (form) => async (dispatch, getState) => {
  try {
    const response = await fetch(`${apiurl}/users/changepassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await response.json()
    console.log(data)
    dispatch({
      type: 'login',
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: 'user_error',
      payload: err,
    })
  }
}

export const Logout = () => async (dispatch, getState) => {
  try {
    await AsyncStorage.setItem('token', '')

    await fetch(`${host}/logout`)

    dispatch({
      type: 'logout',
    })
  } catch (err) {
    dispatch({
      type: 'user_error',
      payload: err,
    })
  }
}
