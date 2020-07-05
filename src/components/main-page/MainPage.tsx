import React from 'react'
import { withRouter } from 'react-router-dom'
import CustomNavbar from './navbar/Navbar'

import './MainPage.css'

const MainPage: React.FC = (props: any) => {
    return (
        <div className='main-page'>
            <CustomNavbar />
            <div className='under-construction'>
                <h1>
                    SITE UNDER CONSTRUCTION
                </h1>
                <div className='grid-view'>
                    <div className='display-box' onClick={() => props.history.push('/sorting-visualizers')}>
                        <i className="fas fa-chart-bar" style={{fontSize: 32, marginRight: 10}}></i>
                        <p style={{fontSize: 24}}>Sorting Visualizers</p>
                    </div>
                </div>
                <div className='grid-view'>
                    <div className='display-box' onClick={() => props.history.push('/path-finders')}>
                        <i className="fas fa-road" style={{fontSize: 32, marginRight: 10}}></i>
                        <p style={{fontSize: 24}}>Path Finders</p>
                    </div>
                </div>
                <div className='grid-view'>
                    <div className='display-box' onClick={() => props.history.push('/stacks-queues-lists')}>
                        <i className="fab fa-stack-overflow" style={{fontSize: 32, marginRight: 10}}></i>
                        <p style={{fontSize: 24}}>Stacks, Queues & List</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(MainPage);