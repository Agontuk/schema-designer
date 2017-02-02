import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Schema from './components/Schema';
import './styles/bootstrap.css';
import './styles/main.css';

const App = () => (
    <Provider store={ store }>
        <Schema />
    </Provider>
);

export default App;
