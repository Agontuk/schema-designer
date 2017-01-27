import React, { Component, PropTypes } from 'react';
import DrawRelationLine from './DrawRelationLine';
import Header from './Header';
import DbModal from '../containers/DbModal';
import TableModal from '../containers/TableModal';
import ColumnModal from '../containers/ColumnModal';
import Tables from '../containers/Tables';

class Schema extends Component {
    constructor(props) {
        super(props);

        if (!props.dbName && !props.dbModal) {
            props.toggleDbModal();
        }
    }

    render() {
        const { dbName, toggleDbModal, toggleTableModal } = this.props;

        return (
            <div className='container-fluid'>
                <Header
                    dbName={ dbName }
                    onToggleDbModal={ toggleDbModal }
                    onToggleTableModal={ toggleTableModal }
                />

                <Tables />

                <DbModal />

                <TableModal />

                <ColumnModal />

                <DrawRelationLine />
            </div>
        );
    }
}

Schema.propTypes = {
    dbName: PropTypes.string.isRequired,
    dbModal: PropTypes.bool.isRequired,
    toggleDbModal: PropTypes.func.isRequired,
    toggleTableModal: PropTypes.func.isRequired
};

export default Schema;
