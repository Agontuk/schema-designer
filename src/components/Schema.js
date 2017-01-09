import React, { Component, PropTypes } from 'react';
import DbForm from './DbForm';

class Schema extends Component {
    render () {
        const { dbName } = this.props;

        return (
            <div>
                <DbForm name={ dbName } />
            </div>
        );
    }
}

Schema.propTypes = {
    dbName: PropTypes.string.isRequired
};

export default Schema;
