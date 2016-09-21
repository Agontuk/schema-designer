import React, { Component, PropTypes } from 'react';

class Counter extends Component {
    render () {
        const { count, onIncrement } = this.props;
        return (
            <div>
                <h1>Count: { count }</h1>
                <button onClick={ onIncrement }>Increment</button>
            </div>
        );
    }
}

Counter.propTypes = {
    count: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired
};

export default Counter;
