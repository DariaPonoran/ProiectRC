import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiurl } from '../utils/config'

export const loadBooks = () => async (dispatch, getState) => {
  try {
    console.log('here')
    const res = await fetch(`${apiurl}/books/all`)
    console.log('got books')
    const data = await res.json()
    console.log(data)

    dispatch({
      type: 'get_all_books',
      payload: data,
    })
  } catch (err) {
    console.log('err', err)
    dispatch({
      type: 'book_error',
      payload: 'err',
    })
  }
}
export const loadBookById = (id) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${apiurl}/books/id/${id}`)
    const data = res.json()
    console.log(data)

    dispatch({
      type: 'get_book',
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: 'book_error',
      payload: 'err',
    })
  }
}

export const increaseBook = (id) => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    const res = await fetch(`${apiurl}/books/id/${id}/increasequantity/1`, {
      method: 'PUT',
      headers: { Authorization: token },
    })
    const data = await res.json()
    console.log(data)
    dispatch({
      type: 'increase_book',
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: 'book_error',
      payload: 'err',
    })
  }
}
export const decreaseBook = (id) => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    const res = await fetch(`${apiurl}/books/id/${id}/decreasequantity/1`, {
      method: 'PUT',
      headers: { Authorization: token },
    })
    const data = await res.json()
    console.log(data)
    dispatch({
      type: 'decrease_book',
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: 'book_error',
      payload: 'err',
    })
  }
}

export const resetBooks = () => (dispatch, getState) => {
  dispatch({
    type: 'reset_book',
  })
}

export const addBook = (book) => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    await fetch(`${apiurl}/books/`, {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    })

    dispatch({
      type: 'add_book',
    })
  } catch (err) {
    dispatch({
      type: 'book_error',
      payload: 'err',
    })
  }
}
