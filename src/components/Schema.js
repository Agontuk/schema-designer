/**
 * @flow
 */
import React from 'react';
import DrawRelationLine from './DrawRelationLine';
import Header from '../containers/Header';
import DbModal from '../containers/Modals/DbModal';
import TableModal from '../containers/Modals/TableModal';
import ColumnModal from '../containers/Modals/ColumnModal';
import Tables from '../containers/Tables';

const Schema = () => {
    console.log('Schema rendering'); // eslint-disable-line no-console

    return (
        <div className='container-fluid'>
            <Header />

            <Tables />

            <DbModal />

            <TableModal />

            <ColumnModal />

            <DrawRelationLine />
        </div>
    );
};

export default Schema;
