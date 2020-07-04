const getNeighbour = (currentCell: number, visited: Record<number, boolean>, row: number, col: number, ignore: number[]) => {
    let neighbours = []
    
    // check top
    if(currentCell-(2*col)>0 && !visited[currentCell-(2*col)])
        neighbours.push([currentCell-(2*col), 0])
    // check left
    if(!ignore.includes(currentCell-2) && !visited[currentCell-2])
        neighbours.push([currentCell-2, 1])
    //check bottom
    if(currentCell+(2*col)<=(row-1)*col && !visited[currentCell+(2*col)])
        neighbours.push([currentCell+(2*col), 2])
    // check right
    if(!ignore.includes(currentCell+2) && !visited[currentCell+2])
        neighbours.push([currentCell+2, 3])
    
    // randomly return a neighbour
    if(neighbours.length > 0){
        let randomNeighbour = Math.floor(Math.random() * neighbours.length)
        return neighbours[randomNeighbour]
    }
    return undefined
}

const maze = ({ row, col }: { row: number; col: number; }) => {
    // console.log(row, col)
    let res: number[] = []
    let ignore: number[] = []
    for(let i=1; i<row*col; i+=col) ignore.push(i)
    for(let i=col; i<=row*col; i+=col) ignore.push(i)

    let stack: number[] = [] 
    let visited: Record<number, boolean> = {}
    let currentCell: number = (col + 1) + 1
    visited[currentCell] = true
    stack.push(currentCell)

    while(stack.length > 0){
        currentCell = stack.shift() !
        let next = getNeighbour(currentCell, visited, row, col, ignore)
        if(next){
            stack.push(currentCell)
            switch (next[1]){
                case 0:
                    res.push(currentCell, currentCell-col, next[0])
                    break
                case 1:
                    res.push(currentCell, currentCell-1, next[0])
                    break
                case 2:
                    res.push(currentCell, currentCell+col, next[0])
                    break
                case 3:
                    res.push(currentCell, currentCell+1, next[0])
                    break
                default:
                    break
            }
            visited[next[0]] = true
            stack.push(next[0])
        }
        else{
            res.push(currentCell)
        }
    }

    return res
}

const mazeGen = (row: number, col: number, start: number, finish: number) => {
    let blocks: number[] = []

    let list = maze({ row, col})

    for(let i=0; i<row; i++){
        for(let j=1; j<=col; j++){
            if(!list.includes((i*col) + j) && (i*col)+j !== start && (i*col)+j !== finish)
                blocks.push((i*col) + j)
        }
    }

    return blocks
}

export default mazeGen