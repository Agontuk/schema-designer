import React, { Component, PropTypes } from 'react';
import DbForm from './DbForm';

class Schema extends Component {
    render () {
        const { dbName, saveDbName } = this.props;

        return (
            <div>
                { dbName ?
                    <h2>Database Name: {dbName}</h2>
                :
                    <DbForm name={ dbName } onSubmit={ saveDbName } />
                }
            </div>
        );
    }
}

Schema.propTypes = {
    dbName: PropTypes.string.isRequired,
    saveDbName: PropTypes.func.isRequired
};

export default Schema;
