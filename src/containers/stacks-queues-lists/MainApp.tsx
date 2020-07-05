import React from 'react'
import './MainApp.css'
import StackDisplay from './components/Stacks/Stacks'
import QueueDisplay from './components/Queues/Queues'
import Navbar from './components/Navbar'
import { Route, Redirect } from 'react-router-dom'

const StacksQueuesLists: React.FC = (props: any) => {
    return (
        <div>
            <Navbar />
            <Redirect path="/stacks-queues-lists/" to="/stacks-queues-lists/stacks" />
            <Route path="/stacks-queues-lists/stacks" exact component={StackDisplay} />
            <Route path="/stacks-queues-lists/queues" exact component={QueueDisplay} />
            <Route path="/stacks-queues-lists/singly-linked-lists" exact component={StackDisplay} />
            <Route path="/stacks-queues-lists/doubly-linked-lists" exact component={StackDisplay} />
        </div>
    )
}

export default StacksQueuesLists