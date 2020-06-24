import React, { useState, useEffect } from 'react'
import {
    newArray,
    bubbleSortArray,
    selectionSortArray,
    insertionSortArray,
    mergeSortArray,
    quickSortArray,
    heapSortArray
} from '../../store/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './mainApp.css'

import CustomSlider from '../../components/custom/CustomSlider'

const MainApp: React.FC = (props: any) => {
    const calcSpeed = (arrSize: number) => {
        if(arrSize > 60){
            return Math.floor(110/arrSize);
        }
        return Math.floor((110/arrSize)*10);
    }

    const [arrSize, setArrSize] = useState(65);
    const [speed, setSpeed] = useState(calcSpeed(arrSize));

    const { newArray } = props;

    useEffect(() => {
        newArray(65)
    }, [newArray])

    const handleArrSize = (size: number) => {
        if(!props.running){
            setArrSize(size)
            if (size !== arrSize){
                props.newArray(size)
                setSpeed(calcSpeed(size))
            }
        }
    }

    const Navbar = (
        <div className='nav-bar'>
            <div className='nav-bar-left'>
                <div className='nav-element' 
                    style={props.running?{color: 'gray'}:{}}
                    onClick={() => {
                        if(!props.running)
                            props.history.push('/')
                    }}  
                >DSA PLAYGROUND</div>
                <div className='nav-element' 
                    style={props.running?{color: 'gray'}:{}}
                    onClick={() => {
                        if (!props.running) props.newArray(arrSize)
                    }}  
                >Generate New Array</div>

                <div className='nav-element' 
                    style={props.running?{color: 'gray'}:{}}
                    onClick={() => {
                        if(!props.running){
                            props.bubbleSortArray(props.arr, speed)
                        }
                }}>Bubble Sort</div>

                <div className='nav-element' 
                    style={props.running?{color: 'gray'}:{}}
                    onClick={() => {
                        if(!props.running){
                            props.insertionSortArray(props.arr, speed)
                        }
                }}>Insertion Sort</div>

                <div className='nav-element' 
                    style={props.running?{color: 'gray'}:{}}
                    onClick={() => {
                        if(!props.running){
                            props.selectionSortArray(props.arr, speed)
                        }
                }}>Selection Sort</div>

                <div className='nav-element' 
                    style={props.running?{color: 'gray'}:{}}
                    onClick={() => {
                        if(!props.running){
                            props.mergeSortArray(props.arr, speed)
                        }
                }}>Merge Sort</div>

                <div className='nav-element' 
                    style={props.running?{color: 'gray'}:{}}
                    onClick={() => {
                        if(!props.running){
                            props.quickSortArray(props.arr, speed)
                        }
                }}>Quick Sort</div>

                <div className='nav-element' 
                    style={props.running?{color: 'gray'}:{}}
                    onClick={() => {
                        if(!props.running){
                            props.heapSortArray(props.arr, speed)
                        }
                }}>Heap Sort</div>
            </div>
            <div className='nav-bar-right'>
                <div className='size-element'>
                    Size :
                    </div>
                <div className='size-element'>
                    {arrSize}
                </div>
                <div className='slider'>
                    <CustomSlider
                        style={{
                            width: 200,
                            marginRight: 50
                        }}
                        val={arrSize}
                        min={5}
                        max={110}
                        step={15}
                        onValChange={handleArrSize}
                        tooltip={false}
                    />
                </div>
            </div>
        </div>
    )

    const ArrayBody = (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            {props.arr.map((ele: number, idx: number) => {
                return (
                    <div
                        style={{
                            backgroundColor: props.sorted.includes(idx) ? '#60FF60' :
                                props.swappers.includes(idx) ? (props.swappers.length === 3 ? 'purple' : 'red') :
                                    '#ffeeff',
                            width: '50px',
                            height: `${ele}px`
                        }} key={idx}
                    >
                    </div>
                )
            })}
        </div>
    )

    return (
        <div className='main-app'>
            {Navbar}
            {ArrayBody}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        arr: state.array.arr,
        swappers: state.array.swappers,
        sorted: state.array.sorted,
        running: state.array.running
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        newArray: (size: number) => dispatch(newArray(size)),
        bubbleSortArray: (arr: number[], speed: number) => dispatch(bubbleSortArray(arr, speed)),
        selectionSortArray: (arr: number[], speed: number) => dispatch(selectionSortArray(arr, speed)),
        insertionSortArray: (arr: number[], speed: number) => dispatch(insertionSortArray(arr, speed)),
        mergeSortArray: (arr: number[], speed: number) => dispatch(mergeSortArray(arr, speed)),
        quickSortArray: (arr: number[], speed: number) => dispatch(quickSortArray(arr, speed)),
        heapSortArray: (arr: number[], speed: number) => dispatch(heapSortArray(arr, speed))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainApp))