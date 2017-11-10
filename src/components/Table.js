/**
 * @flow
 */
import React, { PureComponent } from 'react';
import Columns from '../containers/Columns';
import type { TableType } from '../utils/flowtypes';

class Table extends PureComponent {
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
        console.log('Table rendering'); // eslint-disable-line no-console
        const { data, position } = this.props;

        return (
            <div
                className='db-table draggable no-select'
                id={ data.id }
                style={ { left: position.x, top: position.y } }
            >
                <div className={ `table-header clearfix ${ data.color }` }>
                    <h4 className='pull-left' title={ data.name }>{ data.name }</h4>
                    <div className='pull-right'>
                        <span className='fa fa-plus' onClick={ this.toggleColumnModal }></span>
                        <span className='fa fa-pencil' onClick={ this.editTable }></span>
                        <span className='fa fa-remove' onClick={ this.removeTable }></span>
                    </div>
                </div>

                <Columns table={ data } />
            </div>
        );
    }
}

type Props = {
    data: TableType,
    position: {
        x: number,
        y: number
    },
    onEditTable: (data: TableType) => void,
    onRemoveTable: (id: string) => void,
    onToggleColumnModal: (id: string) => void
};

export default Table;
