import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiurl } from '../utils/config'

export const getAllReviews = () => async (dispatch, getState) => {
  try {
    const res = await fetch(`${apiurl}/reviews/all`)
    const data = await res.json()
    // console.log(data)

    dispatch({
      type: 'get_all_reviews',
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: 'error_review',
      payload: err,
    })
  }
}

export const getreviewByBook = (id) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${apiurl}/reviews/book/${id}`)
    const data = await res.json()
    // console.log(data)

    dispatch({
      type: 'get_reviews_Book',
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: 'error_review',
      payload: err,
    })
  }
}

export const addReview = (bookId, review) => async (dispatch, getState) => {
  try {
    const obj = {
      rating: review.rating,
      reviewDescription: review.reviewDescription,
      bookId: bookId,
    }
    console.log(obj)
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    const res = await fetch(`${apiurl}/reviews/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(obj),
    })
    const data = await res.json()
    console.log(data)
    dispatch({
      type: 'create_review',
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: 'error_review',
      payload: err,
    })
  }
}
