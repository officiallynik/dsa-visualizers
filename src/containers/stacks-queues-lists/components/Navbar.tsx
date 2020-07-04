import React from 'react'
import { withRouter } from 'react-router-dom'

// uses same styles as main navbar

const Navbar = (props: any) =>  (
    <div className='nav-bar'>
        <div className='nav-bar-left'>
            <div className='nav-element'
                onClick={() => {
                    if (!props.running)
                        props.history.push('/')
                }}
            >DSA PLAYGROUND</div>
            <div className='nav-element'
                onClick={() => {

                }}
            >Stacks</div>

            <div className='nav-element'
                onClick={() => {

                }}>Queues</div>

            <div className='nav-element'
                onClick={() => {

                }}>Linked List</div>

            <div className='nav-element'
                onClick={() => {

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