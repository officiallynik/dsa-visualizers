import React from 'react';
import { withRouter } from 'react-router-dom'
import './Navbar.css'

const CustomNavbar = (props: any) => (
    <div className='nav-bar'>
        <div className='nav-bar-left'>
            <div className='nav-element'
                onClick={() => {
                    props.history.push('/')
                }}  
            >DSA PLAYGROUND</div>

            <div className='nav-element' 
                onClick={() => {
                    props.history.push('/sorting-visualizers')
            }}>Sorting Visualizers</div>

            <div className='nav-element' 
                onClick={() => {
                    props.history.push('/under-construction')
            }}>Tree Data Structure</div>

            <div className='nav-element' 
                onClick={() => {
                    props.history.push('/under-construction')
            }}>Graph Data Structure</div>

            <div className='nav-element' 
                onClick={() => {
                    props.history.push('/stacks-queues-lists')
            }}>Stacks, Queues and List</div>

            <div className='nav-element' 
                onClick={() => {
                    props.history.push('/under-construction')    
            }}>Path Finders</div>
        </div>
        <div className='nav-bar-right'>
          <div className='nav-element' 
                onClick={() => {
                    props.history.push('/under-construction')
            }}>Random User</div>
        </div>
    </div>
);

export default withRouter(CustomNavbar)