import React, { useState, useEffect } from 'react'
import './Queues.css'

import CustomButton from '../CustomButton/Button'

interface storageType {
    val : number,
    isHead : boolean,
    beheading : boolean,
    heading : boolean,
    isTail : boolean,
    betailing : boolean,
    tailing : boolean
}

const QueueDisplay = () => {
    const [queue, setQueue] = useState<Array<storageType>>([])
    const [justAdded, setJustAdded] = useState(false)

    const createStorageType = (head: boolean = false, tail: boolean = false) => {
        let val: number
        let isHead: boolean
        let beheading: boolean
        let heading: boolean
        let isTail: boolean
        let betailing: boolean
        let tailing: boolean

        val = Math.floor(Math.random() * 100)
        isHead = head
        beheading = false
        heading = false
        isTail = tail
        betailing = false
        tailing = false

        return {
            val,
            isHead,
            beheading,
            heading,
            isTail,
            betailing,
            tailing
        }
    }

    const createRandomStack = () => {
        let elements: Array<storageType> = []

        for (let i = 0; i < 5; i++) {
            i === 0 ? elements.push(createStorageType(true)) : i === 4? elements.push(createStorageType(false, true)) : elements.push(createStorageType())
        }

        return elements
    }

    useEffect(() => {
        let elements = createRandomStack()
        setQueue(elements)
    }, [])

    const handleEnqueue = () => {
        let element = createStorageType()

        let oldQueue = [...queue]
        let size = oldQueue.length
        setQueue([...oldQueue, element])

        setTimeout(() => {
            element.tailing = true
            if (oldQueue[size-1])
                oldQueue[size-1].betailing = true
            setQueue([...oldQueue, element])
            setTimeout(() => {
                if (oldQueue[size-1]) {
                    oldQueue[size-1].isTail = false
                    oldQueue[size-1].betailing = false
                }
                element.tailing = false
                element.isTail = true
                if(size === 0)
                    element.isHead = true
                setQueue([...oldQueue, element])

                setJustAdded(false)
            }, 500)
        }, 500)
    }

    const handleDequeue = () => {
        if (queue.length > 0) {

            let oldQueue = [...queue]
            oldQueue[0].beheading = true
            if (oldQueue[1])
                oldQueue[1].heading = true

            setQueue([...oldQueue])

            setTimeout(() => {
                oldQueue[0].beheading = false
                oldQueue[0].isHead = false
                if (oldQueue[1]) {
                    oldQueue[1].heading = false
                    oldQueue[1].isHead = true
                }

                setQueue([...oldQueue])

                setTimeout(() => {
                    oldQueue.shift()
                    setQueue([...oldQueue])
                }, 500)
            }, 500)
        }
    }

    const handlePeek = () => {
        let head = document.getElementsByClassName('queue-element')[0]
        if(head){
            head.classList.add('peek-element')
            setTimeout(() => {
                head.classList.remove('peek-element')
            }, 1000)
        }
    }

    return (
        <div className='main-display'>
            <div className='left-section'>
                <div className='display-section'>
                    {queue.map((ele: storageType, idx: number) => {
                        let classes = 'queue-element'
                        let innerDisplay

                        if(ele.isTail && ele.isHead){
                            classes += ' head-element'
                            innerDisplay = (
                                <div>
                                    {ele.val}
                                    <div>head/tail</div>
                                </div>
                            )
                        }
                        else if (ele.isHead && ele.beheading) {
                            if (!justAdded) {
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
                        else if (ele.isHead) {
                            classes += ' head-element'
                            innerDisplay = (
                                <div>
                                    {ele.val}
                                    <div>head</div>
                                </div>
                            )
                        }
                        else if (ele.isTail && ele.betailing) {
                            if (!justAdded) {
                                classes += ' being-behead'
                                innerDisplay = (
                                    <div>
                                        {ele.val}
                                        <div>tail/temp</div>
                                    </div>
                                )
                            }
                            else {
                                classes += ' being-behead'
                                innerDisplay = (
                                    <div>
                                        {ele.val}
                                        <div>tail</div>
                                    </div>
                                )
                            }
                        }
                        else if (ele.isTail) {
                            classes += ' head-element'
                            innerDisplay = (
                                <div>
                                    {ele.val}
                                    <div>tail</div>
                                </div>
                            )
                        }
                        else if (ele.heading) {
                            classes += ' being-head'
                            if (justAdded) {
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
                        else if (ele.tailing) {
                            classes += ' being-head'
                            if (justAdded) {
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
                                setQueue(createRandomStack())
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
                                handleEnqueue()
                            }}
                        >EnQueue</CustomButton>
                        <CustomButton
                            styles={{ width: '49%', height: '98%' }}
                            handleButtonClick={() => {
                                handleDequeue()
                            }}
                        >DeQueue</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueueDisplay