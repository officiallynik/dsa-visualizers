import React, { useState, useEffect } from 'react'

import { handlePush, handlePeek, handlePop, handleCreate } from './helpers/stacks'
import { handleQCreate, handleDeQ, handleQPeek, handleEnQ } from './helpers/queues'

import './MainApp.css'
import CustomButton from './components/Button'

const StacksQueuesLists: React.FC = (props: any) => {

    const [screen, setScreen] = useState(0)

    const [stack, setStack] = useState<number[]>([])
    const [queue, setQueue] = useState<number[]>([])

    const [opt, setOpt] = useState<string|null>(null)

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
                            <div className={idx === 0? 'stack-element head-element': 'stack-element'} key={idx}>
                                {ele}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='right-section'>
                <div className='options'>
                    <div className='option-row'>
                        <CustomButton 
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                handleCreate(setStack)
                            }}
                        >Create</CustomButton>
                        <CustomButton 
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={handlePeek}  
                        >Peek</CustomButton>
                    </div>
                    <div className='option-row'>
                        <CustomButton 
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                setOpt('push')
                                let arr = [...stack]
                                setStack([Math.floor(Math.random() * 100), ...arr])
                            }}    
                        >Push</CustomButton>
                        <CustomButton   
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                setOpt('pop')
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
                            <div className={idx === 0? 'queue-element head-element': idx === queue.length-1? 'queue-element tail-element': 'queue-element' } key={idx}>
                                {ele}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='right-section'>
                <div className='options'>
                    <div className='option-row'>
                        <CustomButton 
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => handleQCreate(setQueue)} 
                        >
                            Create
                        </CustomButton>
                        <CustomButton 
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={handleQPeek}
                        >Peek</CustomButton>
                    </div>
                    <div className='option-row'>
                        <CustomButton 
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                let arr = [...queue]
                                setQueue([...arr, Math.floor(Math.random() * 10)])
                                setOpt('queue')
                            }}
                        >Enqueue</CustomButton>
                        <CustomButton 
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                setOpt('dequeue')
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

    const dummyStack = (
        <div style={{display: 'None'}}>
            <div className='stack-element'></div>
            <div className='stack-element'></div>
        </div>
    )
    const dummyQ = (
        <div style={{display: 'None'}}>
            <div className='queue-element'></div>
            <div className='queue-element'></div>
        </div>
    )

    useEffect(() => {
        switch (opt) {
            case 'push':
                handlePush(setOpt)
                break;
            
            case 'pop':
                handlePop([...stack], setStack, setOpt)
                break

            case 'dequeue':
                handleDeQ([...queue], setQueue, setOpt)
                break

            case 'queue':
                handleEnQ(setOpt)
                break

            default:
                break;
        }
    }, [opt, stack, queue])

    return (
        <div>
            {Navbar}
            {stackDisplay}
            {dummyStack}
            {dummyQ}
            {queueDisplay}
            {linkedListDisplay}
            {doublyLinkedListDisplay}
        </div>
    )
}

export default StacksQueuesLists