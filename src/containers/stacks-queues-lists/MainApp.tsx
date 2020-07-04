import React from 'react'
import './MainApp.css'
import StackDisplay from './components/Stacks/Stacks'
import Navbar from './components/Navbar'

const StacksQueuesLists: React.FC = (props: any) => {
    return (
        <div>
            <Navbar />
            <StackDisplay />
        </div>
    )
}

export default StacksQueuesLists