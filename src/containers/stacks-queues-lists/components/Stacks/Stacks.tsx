import React, { useState, useEffect } from 'react'
import './Stacks.css'

import CustomButton from '../CustomButton/Button'

interface storageType {
    val: number,
    isHead: boolean,
    beheading: boolean,
    heading: boolean
}

const StackDisplay = () => {
    const [stack, setStack] = useState<Array<storageType>>([])
    const [justAdded, setJustAdded] = useState(false)

    const createStorageType = (head: boolean = false) => {
        let val: number
        let isHead: boolean
        let beheading: boolean
        let heading: boolean

        val = Math.floor(Math.random() * 100)
        isHead = head
        beheading = false
        heading = false

        return {
            val,
            isHead,
            beheading,
            heading
        }
    }

    const createRandomStack = () => {
        let elements: Array<storageType> = []

        for (let i = 0; i < 5; i++) {
            i === 0? elements.push(createStorageType(true)): elements.push(createStorageType())
        }

        return elements
    }

    useEffect(() => {
        let elements = createRandomStack()
        setStack(elements)
    }, [])

    const handlePush = () => {
        let element = createStorageType()
        let oldStack = [...stack]
        setStack([element, ...oldStack])

        setTimeout(() => {
            element.heading = true
            oldStack[0].beheading = true
            setStack([element, ...oldStack])
            setTimeout(() => {
                oldStack[0].isHead = false
                element.heading = false
                element.isHead = true
                oldStack[0].beheading = false
                setStack([element, ...oldStack])

                setJustAdded(false)
            }, 500)
        }, 500)
    }

    const handlePop = () => {
        let oldStack = [...stack]
        oldStack[0].beheading = true
        oldStack[1].heading = true

        setStack([...oldStack])
        
        setTimeout(() => {
            oldStack[0].beheading = false
            oldStack[0].isHead = false
            oldStack[1].heading = false
            oldStack[1].isHead = true
            
            setStack([...oldStack])

            setTimeout(() => {
                oldStack.shift()
                setStack([...oldStack])
            }, 500)
        }, 500)
    }

    const handlePeek = () => {
        let head = document.getElementsByClassName('stack-element')[0]
        head.classList.add('peek-element')

        setTimeout(() => {
            head.classList.remove('peek-element')
        }, 1000)
    }

    return (
        <div className='main-display'>
            <div className='left-section'>
                <div className='display-section'>
                    {stack.map((ele: storageType, idx: number) => {
                        let classes = 'stack-element'
                        let innerDisplay

                        if(ele.isHead && ele.beheading){
                            if(!justAdded){
                                classes += ' being-behead'
                                innerDisplay = (
                                    <div>
                                        {ele.val}
                                        <div>head/temp</div>
                                    </div>
                                )
                            }
                            else {
                                classes += ' being-behead'
                                innerDisplay = (
                                    <div>
                                        {ele.val}
                                        <div>head</div>
                                    </div>
                                )
                            }
                        }
                        else if(ele.isHead){
                            classes += ' head-element'
                            innerDisplay = (
                                <div>
                                    {ele.val}
                                    <div>head</div>
                                </div>
                            )
                        }
                        else if(ele.heading){
                            classes += ' being-head'
                            if(justAdded){
                                innerDisplay = (
                                    <div>
                                        {ele.val}
                                        <div>temp</div>
                                    </div>
                                )
                            }
                            else {
                                innerDisplay = (
                                    <div>
                                        {ele.val}
                                    </div>
                                )
                            }
                        }
                        else {
                            innerDisplay = (
                                <div>{ele.val}</div>
                            )
                        }

                        return (
                            <div className={classes} key={idx}>
                                {innerDisplay}
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
                                setStack(createRandomStack())
                            }}
                        >Create</CustomButton>
                        <CustomButton
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                handlePeek()
                            }}
                        >Peek</CustomButton>
                    </div>
                    <div className='option-row'>
                        <CustomButton
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                setJustAdded(true)
                                handlePush()
                            }}
                        >Push</CustomButton>
                        <CustomButton
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                handlePop()
                            }}
                        >Pop</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StackDisplay