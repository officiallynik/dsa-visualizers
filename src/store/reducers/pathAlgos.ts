import * as actionTypes from '../actions/actionTypes'

let initialState: {
    adjacencyList: any,
    pathList: string[],
    visited: string[],
    mazeBlocks: string[],
    cellList: Record<number, Array<string>>
} = {
    adjacencyList: {},
    pathList: [],
    visited: [],
    mazeBlocks: [],
    cellList: {}
}

const reducer = (state = initialState, action: { type: string, payload: any }) => {
    let adjList: any
    switch (action.type) {
        case actionTypes.ADD_VERTEX:
            adjList = { ...state.adjacencyList }
            adjList[action.payload] = []
            return {
                ...state,
                adjacencyList: adjList
            }

        case actionTypes.ADD_EDGE:
            let { vertex1, vertex2 } = action.payload
            adjList = { ...state.adjacencyList }
            adjList[vertex1].push(vertex2)
            adjList[vertex2].push(vertex1)
            return {
                ...state,
                adjacencyList: adjList
            }

        case actionTypes.ANIMATE:
            let { visited, path } = action.payload
            return {
                ...state,
                visited: visited,
                pathList: path
            }

        case actionTypes.MAZE_GEN:
            let { blocks, cellList } = action.payload
            return {
                ...state,
                mazeBlocks: blocks,
                cellList: cellList
            }

        case actionTypes.CLEAR_WALL_PATH:
            return {
                ...state,
                mazeBlocks: [],
                visited: [],
                pathList: [],
                cellList: []
            }

        case actionTypes.CLEAR_PATH:
            return {
                ...state,
                visited: [],
                pathList: []
            }

        default:
            return state
    }
}

export default reducer