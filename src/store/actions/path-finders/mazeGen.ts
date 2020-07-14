const getNeighbour = (currentCell: number, visited: Record<number, boolean>, row: number, col: number) => {
    let neighbours = []
    
    // check top
    if(currentCell-col>0 && !visited[currentCell-col])
        neighbours.push([currentCell-col, 0])
    // check left
    if(currentCell-1>0 && (currentCell-1)%col!==0 && !visited[currentCell-1])
        neighbours.push([currentCell-1, 1])
    //check bottom
    if(currentCell+col<=row*col && !visited[currentCell+col])
        neighbours.push([currentCell+col, 2])
    // check right
    if(currentCell+1<=row*col && (currentCell+1)%(col+1)!==0 && !visited[currentCell+1])
        neighbours.push([currentCell+1, 3])
    
    // randomly return a neighbour
    if(neighbours.length > 0){
        let randomNeighbour = Math.floor(Math.random() * neighbours.length)
        return neighbours[randomNeighbour]
    }
    return undefined
}

interface result {
    cell: number,
    dir: string
}

const maze = ({ row, col }: { row: number; col: number; }) => {
    // console.log(row, col)
    let res: Array<result>  = []

    let stack: number[] = [] 
    let visited: Record<number, boolean> = {}
    let currentCell: number = 1
    visited[currentCell] = true
    stack.push(currentCell)

    while(stack.length > 0){
        currentCell = stack.pop() !
        res.push({
            cell: currentCell,
            dir: 'none'
        })
        let next = getNeighbour(currentCell, visited, row, col)
        if(next){
            stack.push(currentCell)
            switch (next[1]){
                case 0:
                    res.push({
                        cell: currentCell,
                        dir: 'top'
                    }, {
                        cell: next[0],
                        dir: 'bottom'
                    })
                    break
                case 1:
                    res.push({
                        cell: currentCell,
                        dir: 'left'
                    }, {
                        cell: next[0],
                        dir: 'right'
                    })
                    break
                case 2:
                    res.push({
                        cell: currentCell,
                        dir: 'bottom'
                    }, {
                        cell: next[0],
                        dir: 'top'
                    })
                    break
                case 3:
                    res.push({
                        cell: currentCell,
                        dir: 'right'
                    }, {
                        cell: next[0],
                        dir: 'left'
                    })
                    break
                default:
                    break
            }
            visited[next[0]] = true
            stack.push(next[0])
        }
    }

    return res
}

const mazeGen = (row: number, col: number, start: number, finish: number) => maze({row, col})

export default mazeGen