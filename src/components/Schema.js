/**
 * @flow
 */
import React, { Component } from 'react';
import DrawRelationLine from './DrawRelationLine';
import Header from './Header';
import DbModal from '../containers/DbModal';
import TableModal from '../containers/TableModal';
import ColumnModal from '../containers/ColumnModal';
import Tables from '../containers/Tables';

class Schema extends Component {
    constructor(props: Props) {
        super(props);

        if (!props.dbName && !props.dbModal) {
            props.toggleDbModal();
        }
    }

    props: Props

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

type Props = {
    dbName: string,
    dbModal: boolean,
    toggleDbModal: (editMode?: boolean) => void,
    toggleTableModal: () => void
};

export default Schema;
