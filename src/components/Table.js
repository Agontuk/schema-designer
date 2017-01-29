/**
 * @flow
 */
import React, { Component } from 'react';
import Columns from '../containers/Columns';
import type { TableType } from '../utils/flowtypes';

class Table extends Component {
    props: Props

    editTable = () => {
        const { data, onEditTable } = this.props;
        onEditTable(data);
    }

    removeTable = () => {
        const { data, onRemoveTable } = this.props;
        onRemoveTable(data.id);
    }

    toggleColumnModal = () => {
        const { data, onToggleColumnModal } = this.props;
        onToggleColumnModal(data.id);
    }

    render() {
        const { data } = this.props;

        return (
            <div
                className='db-table draggable no-select'
                id={ data.id }
                style={ { left: data.position.x, top: data.position.y } }
            >
                <div className='table-header clearfix'>
                    <h4 className='pull-left' title={ data.name }>{ data.name }</h4>
                    <div className='pull-right'>
                        <span className='glyphicon glyphicon-plus' onClick={ this.toggleColumnModal }></span>
                        <span className='glyphicon glyphicon-pencil' onClick={ this.editTable }></span>
                        <span className='glyphicon glyphicon-remove' onClick={ this.removeTable }></span>
                    </div>
                </div>

                <Columns table={ data } />
            </div>
        );
    }
}

type Props = {
    data: TableType,
    onEditTable: (data: TableType) => void,
    onRemoveTable: (id: string) => void,
    onToggleColumnModal: (id: string) => void
};

export default Table;
