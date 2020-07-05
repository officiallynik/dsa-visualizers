import React from 'react';
import './App.css';
import SortingVisualizers from './containers/sorting-visualizers/MainApp'
import PathFinders from './containers/path-finders/MainApp'
import MainPage from './components/main-page/MainPage'

import { Route, Switch, Redirect } from 'react-router-dom'
import UnderConstruction from './components/UnderConstruction';
import StacksQueuesLists from './containers/stacks-queues-lists/MainApp';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sorting-visualizers" exact component={SortingVisualizers} />
        <Route path="/stacks-queues-lists/*" exact component={StacksQueuesLists} />
        <Redirect path="/stacks-queues-lists/" to="/stacks-queues-lists/stacks" />
        <Route path="/path-finders" exact component={PathFinders} />
        <Route path="/" component={MainPage} />
      </Switch>
      <Route path="/under-construction" exact component={UnderConstruction} />
    </div>
  );
}

export default App;
