import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { handlePush, handlePeek } from './helpers/stacks'

import './MainApp.css'
import CustomButton from './components/Button'

const StacksQueuesLists: React.FC = (props: any) => {

    const [screen, setScreen] = useState(0)

    const [stack, setStack] = useState<number[]>([])
    const [queue, setQueue] = useState([1, 2, 3, 4, 5])

    const Navbar = (
        <div className='nav-bar'>
            <div className='nav-bar-left'>
                <div className='nav-element'
                    style={props.running ? { color: 'gray' } : {}}
                    onClick={() => {
                        if (!props.running)
                            props.history.push('/')
                    }}
                >DSA PLAYGROUND</div>
                <div className='nav-element'
                    style={props.running ? { color: 'gray' } : {}}
                    onClick={() => {
                        setScreen(0)
                    }}
                >Stacks</div>

                <div className='nav-element'
                    style={props.running ? { color: 'gray' } : {}}
                    onClick={() => {
                        setScreen(1)
                    }}>Queues</div>

                <div className='nav-element'
                    style={props.running ? { color: 'gray' } : {}}
                    onClick={() => {
                        setScreen(2)
                    }}>Linked List</div>

                <div className='nav-element'
                    style={props.running ? { color: 'gray' } : {}}
                    onClick={() => {
                        setScreen(3)
                    }}>Doubly Linked List</div>
            </div>
            <div className='nav-bar-right'>
                <div className='nav-element'
                    style={props.running ? { color: 'gray' } : {}}
                    onClick={() => {

                    }}>Some Option</div>
            </div>
        </div>
    )

    const stackDisplay = (
        <div className='main-display' style={screen !== 0? {display: 'none'}: {}}>
            <div className='left-section'>
                <div className='display-section'>
                    {stack.map((ele: any, idx: number) => {
                        return (
                            <div className='stack-element' key={idx}>
                                {ele}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='right-section'>
                <div className='options'>
                    <div className='option-row'>
                        <CustomButton styles={{ width: '49%', height: '98%' }}>Create</CustomButton>
                        <CustomButton 
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={handlePeek}  
                        >Peek</CustomButton>
                    </div>
                    <div className='option-row'>
                        <CustomButton 
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                let arr = [...stack]
                                setStack([Math.floor(Math.random() * 100), ...arr])
                            }}    
                        >Push</CustomButton>
                        <CustomButton   
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                let arr = [...stack]
                                arr.shift()
                                setStack(arr)
                            }}   
                        >Pop</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )

    

    const queueDisplay = (
        <div className='main-display' style={screen !== 1? {display: 'none'}: {}}>
            <div className='left-section'>
                <div className='display-section'>
                    {queue.map((ele: any, idx: number) => {
                        return (
                            <div key={idx}>{ele}</div>
                        )
                    })}
                </div>
            </div>
            <div className='right-section'>
                <div className='options'>
                    <div className='option-row'>
                        <CustomButton styles={{ width: '49%', height: '98%' }}>Create</CustomButton>
                        <CustomButton styles={{ width: '49%', height: '98%' }}>Peek</CustomButton>
                    </div>
                    <div className='option-row'>
                        <CustomButton 
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                let arr = [...queue]
                                setQueue([Math.floor(Math.random() * 10), ...arr])
                            }}
                        >Enqueue</CustomButton>
                        <CustomButton 
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                let arr = [...queue]
                                arr.pop()
                                setQueue(arr)
                            }}
                        >Dequeue</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )

    const linkedListDisplay = (
        <div className='main-display' style={screen !== 2? {display: 'none'}: {}}>
            <div className='left-section'>
                <div className='display-section'>

                </div>
            </div>
            <div className='right-section'>
                <div className='options'>
                    <div className='option-row'>
                        <CustomButton styles={{ width: '49%', height: '98%' }}>Create</CustomButton>
                        <CustomButton styles={{ width: '49%', height: '98%' }}>Search</CustomButton>
                    </div>
                    <div className='option-row'>
                        <CustomButton styles={{ width: '49%', height: '98%' }}>Insert</CustomButton>
                        <CustomButton styles={{ width: '49%', height: '98%' }}>Remove</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )

    const doublyLinkedListDisplay = (
        <div className='main-display' style={screen !== 3? {display: 'none'}: {}}>
            <div className='left-section'>
                <div className='display-section'>

                </div>
            </div>
            <div className='right-section'>
                <div className='options'>
                    <div className='option-row'>
                        <CustomButton styles={{ width: '49%', height: '98%' }}>Create</CustomButton>
                        <CustomButton styles={{ width: '49%', height: '98%' }}>Search</CustomButton>
                    </div>
                    <div className='option-row'>
                        <CustomButton styles={{ width: '49%', height: '98%' }}>Insert</CustomButton>
                        <CustomButton styles={{ width: '49%', height: '98%' }}>Remove</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )

    useEffect(() => {
        handlePush()
    }, [stack])

    return (
        <div>
            {Navbar}
            {stackDisplay}
            {queueDisplay}
            {linkedListDisplay}
            {doublyLinkedListDisplay}
        </div>
    )
}

export default StacksQueuesLists