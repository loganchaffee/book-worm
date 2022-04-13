import * as api from '../api'

export const createPost = (postData) => async (dispatch) => {
    try {
        const { data } = api.createPost(postData)
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()
        dispatch({ type: 'FETCH_ALL_POSTS', payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (postId, userId) => async (dispatch) => {
    try {
        const { data } = api.likePost({ postId, userId })

        dispatch({ type: 'LIKE_POST', payload: { postId, userId }})
    } catch (error) {
        console.log(error);
    }
}

export const dislikePost = (postId, userId) => async (dispatch) => {
    try {
        const { data } = api.dislikePost({ postId, userId })

        dispatch({ type: 'DISLIKE_POST', payload: { postId, userId }})
    } catch (error) {
        console.log(error);
    }
}

export const createComment = (postId, formData, userData) => async (dispatch) => {
    try {
        const { data } = await api.createComment({ postId, formData })

        dispatch({ type: 'CREATE_COMMENT', payload: { postId, formData, userData }})
    } catch (error) {
        console.log(error);
    }
}