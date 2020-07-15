const breadthFirstSearch = (adjList: any, start: string, finish: string) => {
    let visited: any = {};
    let allVisitedNodes: string[] = []
    let path: string[] = [];
    let relations: any = {};
    let queue = [start];

    const bfs = (vertex: string | undefined) => {
        if (vertex === finish) {
            allVisitedNodes.push(vertex)

            let curVertex = vertex
            path.push(curVertex)
            while (relations[curVertex]) {
                curVertex = relations[curVertex]
                path.push(curVertex)
            }

            return
        }
        if (!vertex) {
            return
        }

        visited[vertex] = true
        allVisitedNodes.push(vertex)

        let nextList = adjList[vertex]
        nextList.forEach((node: string) => {
            if (!visited[node] && !queue.includes(node)) {
                relations[node] = vertex
                queue.push(node)
            }
        })

        bfs(queue.shift())
    }
    bfs(queue.shift())

    return [allVisitedNodes, path.reverse()]
}

export default breadthFirstSearch