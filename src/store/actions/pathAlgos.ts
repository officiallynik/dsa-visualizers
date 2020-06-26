import * as actionTypes from './actionTypes'

import { PriorityQueue } from './path-finders/priorityQueue'

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

export const dijkstra: (path: string[]) => Object = (path) => {
    return {
        type: actionTypes.DIJKSTRAS,
        payload: {
            pathList: path
        }
    }
}

export const performDijkstra:
    (adjList: any, blockedIds: string[], startVertex: string, endVertex: string) => any
    = (adjList, blockedIds, startVertex, endVertex) => {
        return (dispatch: any) => {
            // dijstra's logic
            const nodes = new PriorityQueue();
            const distances: any = {};
            const previous: any = {};
            let path = [] //to return at end
            let smallest;
            //build up initial state
            for(let vertex in adjList){
                if(!blockedIds.includes(vertex)){
                    if(vertex === startVertex){
                        distances[vertex] = 0;
                        nodes.enqueue(vertex, 0);
                    } else {
                        distances[vertex] = Infinity;
                        nodes.enqueue(vertex, Infinity);
                    }
                    previous[vertex] = null;
                }
            }
            // as long as there is something to visit
            while(nodes.values.length){
                smallest = nodes.dequeue().val;
                if(smallest === endVertex){
                    //WE ARE DONE
                    //BUILD UP PATH TO RETURN AT END
                    while(previous[smallest]){
                        path.push(smallest);
                        smallest = previous[smallest];
                    }
                    break;
                } 
                if(smallest || distances[smallest] !== Infinity){
                    for(let neighbor in adjList[smallest]){
                        //find neighboring node
                        let nextNode = adjList[smallest][neighbor];
                        //calculate new distance to neighboring node
                        let candidate = distances[smallest] + 1;
                        let nextNeighbor = nextNode;
                        if(candidate < distances[nextNeighbor]){
                            //updating new smallest distance to neighbor
                            distances[nextNeighbor] = candidate;
                            //updating previous - How we got to neighbor
                            previous[nextNeighbor] = smallest;
                            //enqueue in priority queue with new priority
                            nodes.enqueue(nextNeighbor, candidate);
                        }
                    }
                }
            }
            // console.log(path.concat(smallest).reverse())
            dispatch(dijkstra(path.concat(smallest).reverse()));
        }
    }