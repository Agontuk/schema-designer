/**
 * @flow
 */
import React from 'react';
import DrawRelationLine from './DrawRelationLine';
import Header from '../containers/Header';
import DbModal from '../containers/DbModal';
import TableModal from '../containers/TableModal';
import ColumnModal from '../containers/ColumnModal';
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
