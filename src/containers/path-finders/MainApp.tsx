import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './MainApp.css'
import { connect } from 'react-redux'

import { addVertex, addEdge, BFSGraphSearch, DFSGraphSearch, DijkstraGraphSearch } from '../../store/actions'

const MainApp: React.FC = (props: any) => {
    const gridRow = 30;
    const gridCol = 60;

    const [start, setStart] = useState(310)
    const [finish, setFinish] = useState(1240)

    const [dragWall, setDragWall] = useState(false)
    const [dragStart, setDragStart] = useState(false)
    const [dragFinish, setDragFinish] = useState(false)

    const getBlockedIds = () => {
        let blockedIds = []
        let blockedVertices = document.getElementsByClassName('block-wall')
        for (let i = 0; i < blockedVertices.length; i++) {
            blockedIds.push(blockedVertices[i].id)
        }
        return blockedIds
    }

    const Navbar = (
        <div className='nav-bar'>
            <div className='nav-bar-left'>
                <div className='nav-element'
                    onClick={() => {
                        props.history.push('/')
                    }}
                >DSA PLAYGROUND</div>

                <div className='nav-element'
                    onClick={() => {
                        props.DijkstraGraphSearch(props.adjList, getBlockedIds(), `${start}`, `${finish}`)
                    }}>Dijstra's Algorithm</div>

                <div className='nav-element'
                    onClick={() => {

                    }}>Astar Algorithm</div>

                <div className='nav-element'
                    onClick={() => {
                        props.DFSGraphSearch(props.adjList, getBlockedIds(), `${start}`, `${finish}`)
                    }}>DFS Algorithm</div>

                <div className='nav-element'
                    onClick={() => {
                        props.BFSGraphSearch(props.adjList, getBlockedIds(), `${start}`, `${finish}`)
                    }}>BFS Algorithm</div>
            </div>
            <div className='nav-bar-right'>
                <div className='nav-element'
                    onClick={() => {

                    }}
                >Maze Generator</div>

                <div className='nav-element'
                    onClick={() => {

                    }}
                >Clear Walls</div>
            </div>
        </div>
    )

    const { addEdge, addVertex } = props
    useEffect(() => {
        for (let row = 0; row < gridRow; row++) {
            for (let col = 0; col < gridCol; col++) {
                let gridId = col + 1 + (row * gridCol)
                addVertex(`${gridId}`)
                if (gridId - 1 > 0 && (gridId - 1) % 60 !== 0) {
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
        let idx = 1
        const interval = setInterval(() => {
            if (pathList.length > 0 && idx !== pathList.length - 1) {
                document.getElementById(pathList[idx])?.classList.add('path-grid');
                idx++;
            }
            else {
                clearInterval(interval)
            }
        }, 50)
    }

    let { visitedList } = props;
    useEffect(() => {
        let idx = 1
        const interval = setInterval(() => {
            if (visitedList.length > 0 && idx !== visitedList.length-1) {
                document.getElementById(visitedList[idx])?.classList.add('visited-grid');
                idx++;
            }
            else {
                animatePath()
                clearInterval(interval)
            }
        }, 10)
    }, [visitedList, start, finish])


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
        if (dragWall && gridId !== start && gridId !== finish) {
            e.target.classList.toggle('block-wall')
        }
        else if (dragStart) {
            document.getElementsByClassName('start-grid-element')[0].classList.remove('start-grid-element')
            document.getElementById(e.target.id)?.classList.add('start-grid-element')
        }
        else if (dragFinish) {
            document.getElementsByClassName('finish-grid-element')[0].classList.remove('finish-grid-element')
            document.getElementById(e.target.id)?.classList.add('finish-grid-element')
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
                classes += ' start-grid-element'
            }
            if (gridId === finish) {
                classes += ' finish-grid-element'
            }

            elements.push(
                <div
                    key={col}
                    className={classes}
                    id={`${gridId}`}

                    onMouseDown={(e: any) => handleMouseDown(e, gridId)}
                    onMouseUp={() => {
                        setDragWall(false)
                        setDragFinish(false)
                        setDragStart(false)
                        setStart(parseInt(document.getElementsByClassName('start-grid-element')[0].id))
                        setFinish(parseInt(document.getElementsByClassName('finish-grid-element')[0].id))
                    }}
                    onMouseEnter={(e: any) => handleMouseEnter(e, gridId)}
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
        visitedList: state.pathFinders.visited
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addVertex: (vertex: string) => dispatch(addVertex(vertex)),
        addEdge: (vertex1: string, vertex2: string) => dispatch(addEdge(vertex1, vertex2)),
        BFSGraphSearch: (adjList: Object, blockedIds: string[], startVertex: string, endVertex: string) => dispatch(BFSGraphSearch(adjList, blockedIds, startVertex, endVertex)),
        DFSGraphSearch: (adjList: Object, blockedIds: string[], startVertex: string, endVertex: string) => dispatch(DFSGraphSearch(adjList, blockedIds, startVertex, endVertex)),
        DijkstraGraphSearch: (adjList: Object, blockedIds: string[], startVertex: string, endVertex: string) => dispatch(DijkstraGraphSearch(adjList, blockedIds, startVertex, endVertex))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainApp))