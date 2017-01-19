import React, { PropTypes } from 'react';
import DbForm from './DbForm';
import DrawRelationLine from './DrawRelationLine';
import TableModal from '../containers/TableModal';
import ColumnModal from '../containers/ColumnModal';
import Tables from '../containers/Tables';

const Schema = ({ dbName, saveDbName, toggleTableModal }) => (
    <div>
        { dbName ?
            <div className='container-fluid clearfix site-header'>
                <div className='container'>
                    <h1 className='pull-left'>Schema Builder</h1>
                    <div className='pull-right'>
                        <strong>Database: { dbName }</strong>
                        <span className='glyphicon glyphicon-plus' onClick={ toggleTableModal }></span>
                    </div>
                </div>
            </div>
        :
            <DbForm name={ dbName } onSubmit={ saveDbName } />
        }

        <Tables />

        <TableModal />

        <ColumnModal />

        <DrawRelationLine />
    </div>
);

Schema.propTypes = {
    dbName: PropTypes.string.isRequired,
    saveDbName: PropTypes.func.isRequired,
    toggleTableModal: PropTypes.func.isRequired
};

export default Schema;
