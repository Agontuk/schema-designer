import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Schema from './components/Schema';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css/normalize.css';
import 'html5-boilerplate/dist/css/main.css';
import './styles/bootstrap.css';
import './styles/main.css';

const App = () => (
    <Provider store={ store }>
        <Schema />
    </Provider>
);

export default App;
