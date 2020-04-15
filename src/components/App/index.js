import React, { useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Navigation/Footer';
import Home from '../Home';
import NotFound from '../NotFound';
import Analytics from '../Admin/analytics';
import * as routes from '../../constants/routes';
import './App.css';

function App() {
  

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Navigation />
        <header className="App-header">
          <Switch>
            <Route exact path={routes.HOME} component={() => <Home />} />
``            <Route exact path={routes.ANALYTICS} component={() => <Analytics />} />
            <Route component={NotFound} />
          </Switch>
        </header>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
