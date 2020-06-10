import * as actionTypes from '../actions/actionTypes'

let initialState: {
    arr: number[],
    swappers: number[],
    sorted: number[]
} = {
    arr: [],
    swappers: [],
    sorted: []
}

const reducer = (state = initialState, action: { type: string, payload: any }) => {
    let arr = [];
    switch (action.type) {
        case actionTypes.GENERATE_NEW_ARRAY:
            while (arr.length < action.payload.size) {
                let r = Math.floor(Math.random() * 500) + 1;
                if (arr.indexOf(r) === -1) arr.push(r);
            }

            return {
                ...state,
                arr,
                swappers: [],
                sorted: []
            }
        case actionTypes.BUBBLE_SORT:
            if (typeof (action.payload) === 'number') {
                return {
                    ...state,
                    sorted: [...state.sorted, action.payload]
                }
            }
            else if (action.payload.length > 3) {
                return {
                    ...state,
                    arr: action.payload
                }
            }
            else {
                return {
                    ...state,
                    swappers: action.payload
                }
            }

        case actionTypes.SELECTION_SORT:
            if (typeof (action.payload) === 'number') {
                return {
                    ...state,
                    sorted: [...state.sorted, action.payload],
                    swappers: []
                }
            }
            else if (action.payload.length > 3) {
                return {
                    ...state,
                    arr: action.payload
                }
            }
            return {
                ...state,
                swappers: action.payload
            }

        case actionTypes.INSERTION_SORT:
            if (typeof (action.payload) === 'number') {
                return {
                    ...state,
                    sorted: Array.from(Array(action.payload).keys()),
                    swappers: []
                }
            }
            else if (action.payload.length > 3) {
                return {
                    ...state,
                    arr: action.payload
                }
            }
            return {
                ...state,
                swappers: action.payload
            }

        case actionTypes.MERGE_SORT:
            if (typeof (action.payload) === 'number') {
                return {
                    ...state,
                    sorted: Array.from(Array(action.payload).keys()),
                    swappers: []
                }
            }
            else if (action.payload.length > 3) {
                return {
                    ...state,
                    arr: action.payload
                }
            }
            return {
                ...state,
                swappers: action.payload
            }

        case actionTypes.QUICK_SORT:
            if (typeof (action.payload) === 'number') {
                return {
                    ...state,
                    sorted: Array.from(Array(action.payload).keys()),
                    swappers: []
                }
            }
            else if (action.payload.length > 3) {
                return {
                    ...state,
                    arr: action.payload
                }
            }
            return {
                ...state,
                swappers: action.payload
            }

        case actionTypes.HEAP_SORT:
            if (typeof (action.payload) === 'number') {
                return {
                    ...state,
                    sorted: [...state.sorted, action.payload],
                    swappers: []
                }
            }
            else if (action.payload.length > 3) {
                return {
                    ...state,
                    arr: action.payload
                }
            }
            return {
                ...state,
                swappers: action.payload
            }

        default:
            return state
    }
}

export default reducer