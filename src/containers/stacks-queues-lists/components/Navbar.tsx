import React from 'react'
import { withRouter } from 'react-router-dom'

// uses same styles as main navbar

const Navbar = (props: any) =>  (
    <div className='nav-bar'>
        <div className='nav-bar-left'>
            <div className='nav-element'
                onClick={() => {
                    props.history.push('/')
                }}
            >DSA PLAYGROUND</div>
            <div className='nav-element'
                onClick={() => {
                    props.history.push('/stacks-queues-lists/stacks')
                }}
            >Stacks</div>

            <div className='nav-element'
                onClick={() => {
                    props.history.push('/stacks-queues-lists/queues')
                }}>Queues</div>

            <div className='nav-element'
                onClick={() => {
                    props.history.push('/stacks-queues-lists/singly-linked-lists')
                }}>Linked List</div>

            <div className='nav-element'
                onClick={() => {
                    props.history.push('/stacks-queues-lists/doubly-linked-lists')
                }}>Doubly Linked List</div>
        </div>
        <div className='nav-bar-right'>
            <div className='nav-element'
                onClick={() => {

                }}>Some Option</div>
        </div>
    </div>
)

export default withRouter(Navbar)