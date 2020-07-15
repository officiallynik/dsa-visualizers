import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './MainApp.css'
import { connect } from 'react-redux'

import { addVertex, addEdge,
    BFSGraphSearch, DFSGraphSearch, DijkstraGraphSearch, mazeGenerator, resetWallPath } from '../../store/actions'

const MainApp: React.FC = (props: any) => {
    const gridRow = 31;
    const gridCol = 69;

    const [start, setStart] = useState(1045)
    const [finish, setFinish] = useState(1095)
    
    const [dragWall, setDragWall] = useState(false)
    const [dragStart, setDragStart] = useState(false)
    const [dragFinish, setDragFinish] = useState(false)
    
    const [running, setRunnng] = useState(false)
    const [isMazed, setIsMazed] = useState(false)

    const modifyAdjlist = () => {
        let adjList = {...props.adjList}
        if(isMazed){
            console.log("Modifying")
            let { cellList } = props
            for(let i=1; i<=gridCol*gridRow; i++){
                let dirs: Array<string> = cellList[i]
                if(!dirs.includes('top') && i-gridCol>0){
                    let newV1 = [...adjList[i]].filter((el: any) => +el!==i-gridCol)
                    let newV2 = [...adjList[i-gridCol]].filter((el: any) => +el!==i)
                    adjList[i] = newV1
                    adjList[i-gridCol] = newV2
                }
                if(!dirs.includes('bottom') && i+gridCol<=gridRow*gridCol){
                    let newV1 = [...adjList[i]].filter((el: any) => +el!==i+gridCol)
                    let newV2 = [...adjList[i+gridCol]].filter((el: any) => +el!==i)
                    adjList[i] = newV1
                    adjList[i+gridCol] = newV2
                }
                if(!dirs.includes('left') && i-1>0 && (i-1)%gridCol!==0){
                    let newV1 = [...adjList[i]].filter((el: any) => +el!==i-1)
                    let newV2 = [...adjList[i-1]].filter((el: any) => +el!==i)
                    adjList[i] = newV1
                    adjList[i-1] = newV2
                }
                if(!dirs.includes('right') && i+1<=gridCol*gridRow && i%gridCol!==0){
                    let newV1 = [...adjList[i]].filter((el: any) => +el!==i+1)
                    let newV2 = [...adjList[i+1]].filter((el: any) => +el!==i)
                    adjList[i] = newV1
                    adjList[i+1] = newV2
                }
            }
        }
        else {
            let blockedWalls = document.getElementsByClassName('block-wall');
            [].forEach.call(blockedWalls, function (el: any) {
                let v1 = +el.id
                adjList[v1].forEach((v2: any) => {
                    let newV2 = [...adjList[v2]].filter((el: any) => +el!==v1)
                    adjList[v2] = newV2
                })
                delete adjList[v1]
            });
        }

        return adjList
    }

    const resetBoard = () => {
        setIsMazed(false)
        props.reset()
        let mazePath = document.querySelectorAll(".visited-node");
        [].forEach.call(mazePath, function (el: any) {
            el.classList.remove("visited-node");
        });
        mazePath = document.querySelectorAll(".top-wall-remove");
        [].forEach.call(mazePath, function (el: any) {
            el.classList.remove("top-wall-remove");
        });
        mazePath = document.querySelectorAll(".bottom-wall-remove");
        [].forEach.call(mazePath, function (el: any) {
            el.classList.remove("bottom-wall-remove");
        });
        mazePath = document.querySelectorAll(".left-wall-remove");
        [].forEach.call(mazePath, function (el: any) {
            el.classList.remove("left-wall-remove");
        });
        mazePath = document.querySelectorAll(".right-wall-remove");
        [].forEach.call(mazePath, function (el: any) {
            el.classList.remove("right-wall-remove");
        });


        let walls = document.querySelectorAll(".block-wall");
        [].forEach.call(walls, function (el: any) {
            el.classList.remove("block-wall");
        });

        let elems = document.querySelectorAll(".path-grid");
        [].forEach.call(elems, function (el: any) {
            el.classList.remove("path-grid");
        });

        let visiteds = document.querySelectorAll(".visited-grid");
        [].forEach.call(visiteds, function (el: any) {
            el.classList.remove("visited-grid");
        });

        let ends = document.querySelectorAll(".found-path");
        [].forEach.call(ends, function (el: any) {
            el.classList.remove("found-path");
        });
    }

    const softReset = () => {
        props.reset(true)
        let elems = document.querySelectorAll(".path-grid");
        [].forEach.call(elems, function (el: any) {
            el.classList.remove("path-grid");
        });

        let visiteds = document.querySelectorAll(".visited-grid");
        [].forEach.call(visiteds, function (el: any) {
            el.classList.remove("visited-grid");
        });

        let ends = document.querySelectorAll(".found-path");
        [].forEach.call(ends, function (el: any) {
            el.classList.remove("found-path");
        });
    }

    const Navbar = (
        <div className='nav-bar'>
            <div className='nav-bar-left'>
                <div className='nav-element' style={running? {color:'gray'}: {}}
                    onClick={() => {
                        if(!running)
                            props.history.push('/')
                    }}
                >DSA PLAYGROUND</div>

                <div className='nav-element' style={running? {color:'gray'}: {}}
                    onClick={async () => {
                        setRunnng(true)
                        if(!running){
                            softReset()
                            props.DijkstraGraphSearch(modifyAdjlist(), `${start}`, `${finish}`)
                        }
                    }}>Dijstra's Algorithm</div>

                <div className='nav-element' style={running? {color:'gray'}: {}}
                    onClick={() => {

                    }}>Astar Algorithm</div>

                <div className='nav-element' style={running? {color:'gray'}: {}}
                    onClick={() => {
                        setRunnng(true)
                        if(!running){
                            softReset()
                            props.DFSGraphSearch(modifyAdjlist(), `${start}`, `${finish}`)
                        }
                    }}>DFS Algorithm</div>

                <div className='nav-element' style={running? {color:'gray'}: {}}
                    onClick={() => {
                        setRunnng(true)
                        if(!running){
                            softReset()
                            props.BFSGraphSearch(modifyAdjlist(), `${start}`, `${finish}`)
                        }
                    }}>BFS Algorithm</div>
            </div>
            <div className='nav-bar-right'>
                <div className='nav-element' style={running? {color:'gray'}: {}}
                    onClick={() => {
                        setRunnng(true)
                        if(!running){
                            resetBoard()
                            props.mazeGenerator(gridRow, gridCol, start, finish)
                        }
                        setIsMazed(true)
                    }}
                >Maze Generator</div>

                <div className='nav-element' style={running? {color:'gray'}: {}}
                    onClick={() => {
                        if(!running)
                            resetBoard()
                    }}
                >Clear Board</div>
            </div>
        </div>
    )

    const { addEdge, addVertex } = props
    useEffect(() => {
        for (let row = 0; row < gridRow; row++) {
            for (let col = 0; col < gridCol; col++) {
                let gridId = col + 1 + (row * gridCol)
                addVertex(`${gridId}`)
                if (gridId - 1 > 0 && (gridId - 1) % gridCol !== 0) {
                    addEdge(`${gridId}`, `${gridId - 1}`)
                }
                if (gridId - gridCol > 0) {
                    addEdge(`${gridId}`, `${gridId - gridCol}`)
                }
            }
        }
    }, [addEdge, addVertex])

    const { pathList } = props
    const animatePath = () => {
        let idx = 0
        if(pathList.length > 1){
            const interval = setInterval(() => {
                if (idx !== pathList.length) {
                    document.getElementById(pathList[idx])?.classList.add('path-grid');
                    idx++;
                }
                else {
                    if(visitedList.length > 0){
                        setRunnng(false)
                    }
                    clearInterval(interval)
                    document.getElementById(`${start}`)?.classList.add('found-path')
                    document.getElementById(`${finish}`)?.classList.add('found-path')
                }
            }, 50)
        }
        else if(visitedList.length > 0){
            setRunnng(false)
        }
    }

    let { visitedList } = props;
    useEffect(() => {
        let idx = 0
        const interval = setInterval(() => {
            // console.log(idx, visitedList[idx])
            if (visitedList.length > 0 && idx !== visitedList.length) {
                document.getElementById(visitedList[idx])?.classList.add('visited-grid');
                idx++;
            }
            else {
                animatePath()
                clearInterval(interval)
            }
        }, 10)
    }, [visitedList])

    let { mazeBlocks } = props
    useEffect(() => {
        if (mazeBlocks.length > 0) {
            let idx = 0
            const interval = setInterval(() => {
                if(document.getElementsByClassName('none-wall-remove')[0])
                    document.getElementsByClassName('none-wall-remove')[0].classList.remove('none-wall-remove')
                if(mazeBlocks[idx].dir === 'none'){
                    document.getElementById(`${mazeBlocks[idx].cell}`)?.classList.add(`${mazeBlocks[idx].dir}-wall-remove`);
                    document.getElementById(`${mazeBlocks[idx].cell}`)?.classList.add('visited-node')
                }
                else{
                    document.getElementById(`${mazeBlocks[idx].cell}`)?.classList.add(`${mazeBlocks[idx].dir}-wall-remove`);
                }
                if (idx === mazeBlocks.length-1) {
                    document.getElementsByClassName('none-wall-remove')[0].classList.remove('none-wall-remove')
                    setRunnng(false)
                    clearInterval(interval)
                }
                idx++;
            }, 1)
        }
    }, [mazeBlocks])

    const handleMouseDown = (e: any, gridId: any) => {
        if (gridId !== start && gridId !== finish) {
            e.target.classList.toggle('block-wall')
            setDragWall(true)
        }
        else {
            if (gridId === start)
                setDragStart(true)
            else
                setDragFinish(true)
        }
    }

    const handleMouseEnter = (e: any, gridId: any) => {
        if (dragWall && gridId !== start && gridId !== finish && !isMazed) {
            e.target.classList.toggle('block-wall')
        }
        else if (dragStart) {
            let lastStart = document.getElementsByClassName('start-grid-element')[0]
            lastStart.classList.remove('start-grid-element')
            lastStart.classList.remove('fas')
            lastStart.classList.remove('fa-running')
            document.getElementById(e.target.id)?.classList.add('start-grid-element')
            document.getElementById(e.target.id)?.classList.add('fas')
            document.getElementById(e.target.id)?.classList.add('fa-running')
        }
        else if (dragFinish) {
            let lastFinish = document.getElementsByClassName('finish-grid-element')[0]
            lastFinish.classList.remove('finish-grid-element')
            lastFinish.classList.remove('fas')
            lastFinish.classList.remove('fa-home')
            document.getElementById(e.target.id)?.classList.add('finish-grid-element')
            document.getElementById(e.target.id)?.classList.add('fas')
            document.getElementById(e.target.id)?.classList.add('fa-home')
        }
    }

    let grid: any[] = []
    for (let row = 0; row < gridRow; row++) {
        let elements = []
        for (let col = 0; col < gridCol; col++) {
            let gridId = col + 1 + (row * gridCol)

            let classes = 'grid-element'
            if (row === gridRow - 1) {
                classes += ' border-bottom'
            }
            if (col === gridCol - 1) {
                classes += ' border-right'
            }
            if (gridId === start) {
                classes += ' start-grid-element fas fa-running'
            }
            if (gridId === finish) {
                classes += ' finish-grid-element fas fa-home'
            }

            elements.push(
                <div
                    key={col}
                    className={classes}
                    id={`${gridId}`}

                    onMouseDown={(e: any) => {
                        if(!running)
                            handleMouseDown(e, gridId)
                    }}
                    onMouseUp={() => {
                        if(!running){
                            setDragWall(false)
                            setDragFinish(false)
                            setDragStart(false)
                            setStart(parseInt(document.getElementsByClassName('start-grid-element')[0].id))
                            setFinish(parseInt(document.getElementsByClassName('finish-grid-element')[0].id))
                        }
                    }}
                    onMouseEnter={(e: any) => {
                        if(!running)
                            handleMouseEnter(e, gridId)
                    }}
                >
                </div>
            )
        }
        grid.push(
            <div key={row} className='grid-row'>
                {elements}
            </div>
        )
    }

    useEffect(() => {
        return resetBoard
    }, [])

    return (
        <div>
            {Navbar}
            <div className='grid-main'>
                {grid}
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        adjList: state.pathFinders.adjacencyList,
        pathList: state.pathFinders.pathList,
        visitedList: state.pathFinders.visited,
        mazeBlocks: state.pathFinders.mazeBlocks,
        cellList: state.pathFinders.cellList
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addVertex: (vertex: string) => dispatch(addVertex(vertex)),
        addEdge: (vertex1: string, vertex2: string) => dispatch(addEdge(vertex1, vertex2)),
        reset: (onlyPath: boolean) => dispatch(resetWallPath(onlyPath)),
        mazeGenerator: (row: number, col: number, start: number, finish: number) => dispatch(mazeGenerator(row, col, start, finish)),
        BFSGraphSearch: (adjList: Object, startVertex: string, endVertex: string) => dispatch(BFSGraphSearch(adjList, startVertex, endVertex)),
        DFSGraphSearch: (adjList: Object, startVertex: string, endVertex: string) => dispatch(DFSGraphSearch(adjList, startVertex, endVertex)),
        DijkstraGraphSearch: (adjList: Object, startVertex: string, endVertex: string) => dispatch(DijkstraGraphSearch(adjList, startVertex, endVertex))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainApp))