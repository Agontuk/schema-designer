/**
 * @flow
 */
import noop from 'lodash/noop';
import React, { PureComponent } from 'react';
import Columns from '../containers/Columns';
import type { TableType } from '../utils/flowtypes';

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

class Table extends PureComponent<Props> {
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
                        <span
                            className='fa fa-plus'
                            onClick={ this.toggleColumnModal }
                            onKeyPress={ noop }
                        >
                        </span>
                        <span
                            className='fa fa-pencil'
                            onClick={ this.editTable }
                            onKeyPress={ noop }
                        >
                        </span>
                        <span
                            className='fa fa-remove'
                            onClick={ this.removeTable }
                            onKeyPress={ noop }
                        >
                        </span>
                    </div>
                </div>

                <Columns table={ data } />
            </div>
        );
    }
}

export default Table;
