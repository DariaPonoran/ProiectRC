import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiurl } from '../utils/config'

export const getHistoriesByAuth = () => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    const res = await fetch(`${apiurl}/histories/authUser`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
    const data = await res.json()
    console.log(data)

    dispatch({
      type: 'get_histories_auth',
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: 'error_history',
      message: err,
    })
  }
}

export const resetHistory = () => async (dispatch, getState) => {
  dispatch({
    type: 'reset_history',
  })
}
