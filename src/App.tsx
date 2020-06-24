import React from 'react';
import './App.css';
import SortingVisualizers from './containers/sorting-visualizers/mainApp'
import TreeVisualizers from './containers/tree-visualizers/mainApp'

import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sorting-visualizers" component={SortingVisualizers} />
        <Route path="/tree-visualizers" component={TreeVisualizers} />
      </Switch>
    </div>
  );
}

export default App;
