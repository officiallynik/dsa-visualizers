import * as actionTypes from './actionTypes'

import BFS from './path-finders/graphBFS'
import DFS from './path-finders/graphDFS'
import Dijstra from './path-finders/dijkstras'
import mazeGen from './path-finders/mazeGen'

export const addVertex: (vertex: string) => Object = (vertex) => {
    return {
        type: actionTypes.ADD_VERTEX,
        payload: vertex
    }
}

export const addEdge: (vertex1: string, vertex2: string) => Object = (vertex1, vertex2) => {
    return {
        type: actionTypes.ADD_EDGE,
        payload: {
            vertex1,
            vertex2
        }
    }
}

export const animate: (path: string[], visited: string[]) => Object = (path, visited) => {
    return {
        type: actionTypes.ANIMATE,
        payload: {
            path,
            visited
        }
    }
}

export const DijkstraGraphSearch:
    (adjList: any, blockedIds: string[], startVertex: string, endVertex: string) => any
    = (adjList, blockedIds, startVertex, endVertex) => {
        return (dispatch: Function) => {
            let [visited, path] = Dijstra(adjList, blockedIds, startVertex, endVertex)
            dispatch(animate(path, visited))
        }

    }

export const BFSGraphSearch:
    (adjList: any, blockedIds: string[], startVertex: string, endVertex: string) => any
    = (adjList, blockedIds, startVertex, endVertex) => {
        return (dispatch: Function) => {
            let [visited, path] = BFS(adjList, blockedIds, startVertex, endVertex)
            dispatch(animate(path, visited))
        }

    }

export const DFSGraphSearch:
    (adjList: any, blockedIds: string[], startVertex: string, endVertex: string) => any
    = (adjList, blockedIds, startVertex, endVertex) => {
        return (dispatch: Function) => {
            let [visited, path] = DFS(adjList, blockedIds, startVertex, endVertex)
            dispatch(animate(path, visited))
        }

    }

export const mazeGenerator: (row: number, col: number, start: number, end: number) => Object = (row, col, start, end) => {
    return {
        type: actionTypes.MAZE_GEN,
        payload: {
            blocks: mazeGen(row, col, start, end)
        }
    }
}

export const resetWallPath: (onlyPath: boolean) => Object = (onlyPath) => {
    if(onlyPath){
        return {
            type: actionTypes.CLEAR_PATH,
            payload: {}
        }
    }
    return {
        type: actionTypes.CLEAR_WALL_PATH,
        payload: {}
    }
}