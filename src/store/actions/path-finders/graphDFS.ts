const depthFirstSearch = (adjList: any, excludeList: string[], start: string, end: string) => {
    let visited: any = {};
    let allVisitedNodes: string[] = [];
    let path: string[] = [];
    (function dfs(vertex: string) {
        if (vertex === end) {
            allVisitedNodes.push(vertex)
            return vertex
        }
        if (!vertex) {
            return 'done'
        }

        visited[vertex] = true
        allVisitedNodes.push(vertex)
        let nextList = adjList[vertex]
        let idx = 0
        let isEnd = false
        while (idx < nextList.length && !isEnd) {
            if (!visited[nextList[idx]] && !excludeList.includes(nextList[idx])) {
                let res = dfs(nextList[idx])
                if (res && res !== 'done') {
                    path.push(res)
                    return vertex
                }
            }
            idx++
        }
    })(start)

    return [allVisitedNodes, path.concat(start).reverse()]
}

export default depthFirstSearch