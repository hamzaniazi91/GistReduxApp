import { TYPES } from './actions'

const initialStates = {
  settings: {
    msg: {},
  },
}


export function selectedgists(state = '', action) {
    switch (action.type) {
        case TYPES.SELECT_GISTS:
            return action.gists
        default:
            return state
    }
}

export function errorGists(state = '', action) {
    switch (action.type) {
        case TYPES.ERROR:
            return action.error
        default:
            return state
    }
}

export function setForks(state = [], action) {
    switch (action.type) {
        case TYPES.SELECT_FORKS:
            return action.forks
        default:
            return state
    }
}
function posts(state = {
                   isFetching: false,
                   didInvalidate: false,
                   items: []
               }, action) {
    switch (action.type) {
        case TYPES.INVALIDATE_POSTS:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case TYPES.REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case TYPES.RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt,

            })
        default:
            return state
    }
}
export function postsByGists(state = { }, action) {
    switch (action.type) {
        case TYPES.INVALIDATE_POSTS:
        case TYPES.RECEIVE_POSTS:
        case TYPES.REQUEST_POSTS:
            return Object.assign({}, state, {
                posts : posts(state[action.gists], action)
            }
            )
        default:
            return state
    }
}

export const settings = (state = initialStates.settings, action) => {
  switch (action.type) {
 
      case TYPES.SELECTED_POSTS:
            return Object.assign({}, state, { msg: action.String }) 

    default:
      return state
  }
}
