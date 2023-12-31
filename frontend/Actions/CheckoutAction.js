import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiurl } from '../utils/config'

export const getCheckoutByAuth = () => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    const res = await fetch(`${apiurl}/checkout/authUser`, {
      method: 'GET',
      headers: { Authorization: token },
    })
    const data = await res.json()
    console.log(data)
    dispatch({
      type: 'get_checkouts_auth',
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: 'error_checkout',
      payload: err,
    })
  }
}
export const resetCheckouts = () => async (dispatch, getState) => {
  dispatch({
    type: 'reset_checkout',
  })
}

export const returnBook = (id) => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    await fetch(`${apiurl}/checkout/returnBook/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })

    dispatch({
      type: 'return_book',
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: 'error_checkout',
      payload: err,
    })
  }
}
export const extendCheckout = (id) => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    const res = await fetch(`${apiurl}/checkout/extendReturn/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log(data)
    dispatch({
      type: 'extend_checkout',
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: 'error_checkout',
      payload: err,
    })
  }
}
export const AddCheckout = (bookId) => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    await fetch(`${apiurl}/checkout/book/${bookId}`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })

    dispatch({
      type: 'create_checkout',
    })
  } catch (err) {
    dispatch({
      type: 'error_checkout',
      payload: err,
    })
  }
}
