import { combineReducers } from 'redux'import { ZOOM_STAGE, TOGGLE_ITEM, CHANGE_CENTER } from './actions/actions'function stage(state = {    width: 100,    height: 100}, action) {    switch (action.type) {        case ZOOM_STAGE:            const { width, height } = action;            return {                width,                height            }        default:            return state    }}function items(state = [], action) {    switch (action.type) {        case CHANGE_CENTER:            const { topNum, topRan } = action;            let newState = [],                topIndex = Math.floor(state.length * topRan),                leftNum = 0;            topIndex = topNum ? topIndex : -1;            state.map(function(item, index) {                if (index === action.index) {                    newState.push(Object.assign({}, state[index], {                        position: 0,                        inverse: false                    }));                } else if (index === topIndex) {                    newState.push(Object.assign({}, state[index], {                        position: 1,                        inverse: false                    }));                } else {                    newState.push(Object.assign({}, state[index], {                        position: (leftNum < (state.length - 1 - topNum) / 2) ? 2 : 3,                        inverse: false                    }));                    leftNum++;                }            })            return newState        case TOGGLE_ITEM:            return [                ...state.slice(0, action.index),                Object.assign({}, state[action.index], {                    inverse: !state[action.index].inverse                }),                ...state.slice(action.index + 1)            ]        default:            return state    }}const stageApp = combineReducers({    stage,    items})export default stageApp