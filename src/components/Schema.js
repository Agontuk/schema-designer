import React, { PropTypes } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import DbForm from './DbForm';
import DrawRelationLine from './DrawRelationLine';
import TableModal from '../containers/TableModal';
import ColumnModal from '../containers/ColumnModal';
import Tables from '../containers/Tables';

const tooltip = (
    <Tooltip id='tooltip'><strong>Create New Table</strong></Tooltip>
);

const Schema = ({ dbName, saveDbName, toggleTableModal, generateMigration }) => (
    <div>
        { dbName ?
            <div className='container-fluid clearfix site-header'>
                <div className='container'>
                    <h1 className='pull-left'>Schema Builder</h1>
                    <div className='pull-right'>
                        <em>Database: { dbName }</em>
                        <OverlayTrigger placement='bottom' overlay={ tooltip }>
                            <span className='glyphicon glyphicon-plus' onClick={ toggleTableModal }></span>
                        </OverlayTrigger>

                        { typeof schema === 'object' &&
                            window.schema.packageMode &&
                            !!window.schema.apiEndpoint &&
                            <span
                                className='glyphicon glyphicon-download-alt'
                                onClick={ generateMigration }
                            > Export
                            </span>
                        }
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
    toggleTableModal: PropTypes.func.isRequired,
    generateMigration: PropTypes.func.isRequired
};

export default Schema;
