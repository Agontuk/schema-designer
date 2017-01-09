import React, { Component, PropTypes } from 'react';
import DbForm from './DbForm';
import TableModal from './TableModal';

class Schema extends Component {
    render () {
        const { dbName, saveDbName, showTableModal, toggleTableModal } = this.props;

        return (
            <div>
                { dbName ?
                    <div>
                        <h2>Database Name: {dbName}</h2>
                        <button type='button' className='btn btn-primary' onClick={ toggleTableModal }>
                            <span className='glyphicon glyphicon-plus'></span> Create Table
                        </button>
                    </div>
                :
                    <DbForm name={ dbName } onSubmit={ saveDbName } />
                }

                <TableModal showTableModal={ showTableModal } onHideTableModal={ toggleTableModal } />
            </div>
        );
    }
}

Schema.propTypes = {
    dbName: PropTypes.string.isRequired,
    showTableModal: PropTypes.bool.isRequired,
    saveDbName: PropTypes.func.isRequired,
    toggleTableModal: PropTypes.func.isRequired
};

export default Schema;
