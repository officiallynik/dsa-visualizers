interface valType {
    val: string,
    priority: number
}

class PriorityQueue {
    values: Array<valType>
    constructor() {
        this.values = [];
    }
    enqueue(val: string, priority: number) {
        this.values.push({ val, priority });
        this.sort();
    };
    dequeue() {
        return this.values.shift();
    };
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    };
}

const reconstructPath = (cameFrom: Record<string, string>, current: string) => {
    let totalPath = [current]
    while(Object.keys(cameFrom).includes(current)){
        current = cameFrom[current]
        totalPath.unshift(current)
    }
    return totalPath
}

const AStar = (adjList: Record<string, Array<string>>, start: string, finish: string) => {
    let allVisitedNodes: string[] = []
    let nbCol = 69
    let heuristics: Array<number> = []
    let nbNodes = Object.keys(adjList).length
    for(let i=0; i<=nbNodes; i++){
        heuristics.push(Math.abs(+finish-i))
    }

    let openSet = new PriorityQueue()
    openSet.enqueue(start, heuristics[+start])
    let cameFrom: Record<string, string> = {}

    let gScore: Record<number, number> = {}
    for(let i=0; i<=nbNodes; i++){
        gScore[i] = Infinity
    }
    gScore[+start] = 0

    let fScore: Record<number, number> = {}
    for(let i=0; i<=nbNodes; i++){
        fScore[i] = Infinity
    }
    fScore[+start] = heuristics[+start]

    while(openSet.values.length > 0){
        let current = openSet.dequeue()?.val

        allVisitedNodes.push(current!)

        if(current === finish){
            return [allVisitedNodes, reconstructPath(cameFrom, current!)]
        }

        adjList[current!].forEach((neighbor: string) => {
            // gScore + dist(curr, neighbor) 
            let tempgScore = gScore[+current!] + 1
            if(tempgScore < gScore[+neighbor]){
                cameFrom[neighbor] = current!
                gScore[+neighbor] = tempgScore
                fScore[+neighbor] = gScore[+neighbor] + heuristics[+neighbor]
                openSet.enqueue(neighbor, fScore[+neighbor])
            }
            
        })
    }

    return [allVisitedNodes, []]
}

export default AStar