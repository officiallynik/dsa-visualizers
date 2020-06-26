import * as actionTypes from '../actions/actionTypes'

let initialState: {
    adjacencyList: any,
    pathList: string[]
} = {
    adjacencyList: {},
    pathList: []
}

const reducer = (state = initialState, action: {type: string, payload: any}) => {
    let adjList: any
    switch (action.type) {
        case actionTypes.ADD_VERTEX:
            adjList =  {...state.adjacencyList}
            adjList[action.payload] = []
            return {
                ...state,
                adjacencyList: adjList
            }
        
        case actionTypes.ADD_EDGE:
            let {vertex1, vertex2} = action.payload
            adjList = {...state.adjacencyList}
            adjList[vertex1.node].push(vertex2)
            adjList[vertex2.node].push(vertex1)
            return {
                ...state,
                adjacencyList: adjList
            }

        case actionTypes.DIJKSTRAS:
            return {
                ...state,
                pathList: action.payload.pathList
            }
    
        default:
            return state
    }
}

export default reducer