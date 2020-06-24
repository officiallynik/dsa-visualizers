import React from 'react';
import './App.css';
import SortingVisualizers from './containers/sorting-visualizers/mainApp'

import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sorting-visualizers" component={SortingVisualizers} />
      </Switch>
    </div>
  );
}

export default App;
