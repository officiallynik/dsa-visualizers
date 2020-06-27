import React from 'react';
import './App.css';
import SortingVisualizers from './containers/sorting-visualizers/MainApp'
import MainPage from './components/main-page/MainPage'

import { Route, Switch } from 'react-router-dom'
import UnderConstruction from './components/UnderConstruction';
import StacksQueuesLists from './containers/stacks-queues-lists/MainApp';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sorting-visualizers" exact component={SortingVisualizers} />
        <Route path="/stacks-queues-lists" exact component={StacksQueuesLists} />
        <Route path="/" component={MainPage} />
      </Switch>
      <Route path="/under-construction" exact component={UnderConstruction} />
    </div>
  );
}

export default App;
