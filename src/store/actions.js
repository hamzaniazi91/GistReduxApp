import * as constants from '../Constants/constants';

export const TYPES = {
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_HAMZA_CHAT : "SET_HAMZA_CHAT",
  REQUEST_POSTS : 'REQUEST_POSTS',
RECEIVE_POSTS : 'RECEIVE_POSTS',
SELECT_GISTS: 'SELECT_GISTS',
INVALIDATE_POSTS: 'INVALIDATE_POSTS',
ERROR:'ERROR',
SELECTED_POSTS: 'SELECTED_POSTS',
SELECT_FORKS :'SELECT_FORKS'
,
}

export const actions = {
  setNotifications: (bool) => ({ type: TYPES.SET_NOTIFICATIONS, bool }),
  setHAMZACHAT : (String) =>({ type: TYPES.SET_HAMZA_CHAT , String}),
  setSelected : (String) =>({type: TYPES.SELECTED_POSTS , String }),
  // setForks : (String2) => ({type: TYPES.SELECT_FORKS , String2}) 
}

export function invalidatePosts(arg1) {
    return {
        type: TYPES.INVALIDATE_POSTS,
        arg1
    }
}

export function errorGists(arg1) {
    return {
        type: TYPES.ERROR,
        error : arg1
    }
}

function requestPosts(arg1) {
    return {
        type: TYPES.REQUEST_POSTS,
        arg1
    }
}

function receivePosts(arg1, json) {
	console.log(json)
    return {
        type: TYPES.RECEIVE_POSTS,
        arg1,
        posts: json,
        receivedAt: Date.now()
    }
}

function receiveForks(forks, json) {
	console.log(forks ,json)
    return {
        type: TYPES.SELECT_FORKS,
        forks: json,
        receivedAt: Date.now()
    }
}

export function fetchForks(forks) {
	console.log(forks)
	return dispatch => {
        fetch(forks)
          .then(res => {
        console.log(res)
        if(res.status !== 200){
           dispatch(errorGists(res))
        }
        else{
             return res.json()
           } 
              })
            .then(json => {
            	let forks_users
            	 if (json) {
                     forks_users = json.map(fo => {
                        return {login: fo.owner.login, avatar: fo.owner.avatar_url, url: fo.forks_url, updated_at: fo.updated_at, url : fo.url}
                    }).slice(0,3);
                }
            	dispatch(receiveForks(forks, forks_users))
            })
}
}

 function fetchPosts(arg1) {
	const targetUrl = constants.API_URL.replace('{username}', arg1);
    return dispatch => {
        dispatch(requestPosts(arg1))
        return fetch(targetUrl)
            .then(res => {
        console.log(res)
        if(res.status !== 200){
        	 dispatch(errorGists(res))
        }
        else{
             return res.json()} 
              }).then(json => dispatch(receivePosts(arg1, json)))
    }
}



export function fetchPostsIfNeeded(arg1) {
    return (dispatch, getState) => {
            return dispatch(fetchPosts(arg1))
    }
}