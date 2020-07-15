class PriorityQueue {
    values: any[]
    constructor() {
        this.values = [];
    }
    enqueue(val: any, priority: any) {
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

const Dijkstra = (adjList: any, start: string, finish: string) => {
    const nodes = new PriorityQueue();
    const distances: any = {};
    const previous: any = {};
    let path: string[] = [] //to return at end
    let smallest;
    let allVisitedNodes: any = []
    //build up initial state
    for (let vertex in adjList) {
        if (vertex === start) {
            distances[vertex] = 0;
            nodes.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            nodes.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
    }
    // as long as there is something to visit
    while (nodes.values.length) {
        smallest = nodes.dequeue().val;
        allVisitedNodes.push(smallest)
        if (smallest === finish) {
            //WE ARE DONE
            //BUILD UP PATH TO RETURN AT END
            while (previous[smallest]) {
                path.push(smallest);
                smallest = previous[smallest];
            }
            break;
        }
        if (smallest || distances[smallest] !== Infinity) {
            for (let neighbor in adjList[smallest]) {
                //find neighboring node
                let nextNode = adjList[smallest][neighbor];
                //calculate new distance to neighboring node
                let candidate = distances[smallest] + 1;
                let nextNeighbor = nextNode;
                if (candidate < distances[nextNeighbor]) {
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
    return [allVisitedNodes, path.concat(smallest).reverse()];
}

export default Dijkstra