import React, { useState, useEffect } from 'react'
import { newArray, 
    bubbleSortArray, 
    selectionSortArray, 
    insertionSortArray, 
    mergeSortArray,
    quickSortArray,
    heapSortArray
 } from '../store/actions'
import { connect } from 'react-redux'
import './mainApp.css'


const MainApp: React.FC = (props: any) => { 
    const [running, setRunning] = useState(false) 

    useEffect(() => props.newArray(60), [])

    return (
        <div className='main-app'>
            <div className='nav-bar'>
                <div className='nav-bar-left'>
                    <div className='nav-element' onClick={() => {
                        if(!running) props.newArray(60)
                    }}
                    >Generate New Array</div>

                    <div className='nav-element' onClick={() => {
                        setRunning(true)
                        props.bubbleSortArray(props.arr)}}>Bubble Sort</div>

                    <div className='nav-element' onClick={() => {
                        setRunning(true)
                        props.insertionSortArray(props.arr)}}>Insertion Sort</div>

                    <div className='nav-element' onClick={() => {
                        setRunning(true)
                        props.selectionSortArray(props.arr)}}>Selection Sort</div>

                    <div className='nav-element' onClick={() => {
                        setRunning(true)
                        props.mergeSortArray(props.arr)}}>Merge Sort</div>

                    <div className='nav-element' onClick={() => {
                        setRunning(true)
                        props.quickSortArray(props.arr)}}>Quick Sort</div>

                    <div className='nav-element' onClick={() => {
                        setRunning(true)
                        props.heapSortArray(props.arr)}}>Heap Sort</div>
                </div>
                <div>
                    
                </div>
            </div>
            <div style={{display:'flex', flexDirection: 'row', justifyContent:'center'}}>
                {props.arr.map((ele: number, idx: number) => {
                    return(
                        <div 
                            style={{
                                backgroundColor: props.sorted.includes(idx)? '	#60FF60': 
                                                 props.swappers.includes(idx)? (props.swappers.length===3? 'purple' : 'red'):
                                                 '#ffeeff',
                                width: '50px', 
                                height: `${ele}px`
                            }} key={idx}
                        >
                        </div>
                    ) 
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        arr: state.array.arr,
        swappers: state.array.swappers,
        sorted: state.array.sorted
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        newArray: (size: number) => dispatch(newArray(size)),
        bubbleSortArray: (arr: number[]) => dispatch(bubbleSortArray(arr)),
        selectionSortArray: (arr: number[]) => dispatch(selectionSortArray(arr)),
        insertionSortArray: (arr: number[]) => dispatch(insertionSortArray(arr)),
        mergeSortArray: (arr: number[]) => dispatch(mergeSortArray(arr)),
        quickSortArray: (arr: number[]) => dispatch(quickSortArray(arr)),
        heapSortArray: (arr: number[]) => dispatch(heapSortArray(arr))
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp)