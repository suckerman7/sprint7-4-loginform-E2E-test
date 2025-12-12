import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Success from './components/Success';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <div className='content-section'>
            <Router>
                <Switch>
                    <Route exact path='/' component={Login}>
                    </Route>
                    <Route exact path='/main' component={Success}>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}