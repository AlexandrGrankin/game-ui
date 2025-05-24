import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.css';
import {AppProvider} from './context/AppContext';
import HomePage from './pages/HomePage/HomePage';
import BattlePage from './pages/BattlePage/BattlePage';

function App() {
    return (
        <AppProvider>
            <Router>
                <div className="app-container">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/battle" component={BattlePage} />
                    </Switch>
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;