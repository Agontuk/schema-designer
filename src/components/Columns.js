/**
 * @flow
 */
import React, { Component } from 'react';
import Column from './Column';
import type { TableType, ColumnType } from '../utils/flowtypes';

class Columns extends Component {
    props: Props

    render() {
        const { columns, table, removeColumn, editColumn } = this.props;

        if (columns.length === 0 && !table.softDelete && !table.timeStamp) {
            return null;
        }

        return (
            <ul className='db-columns'>
                { columns.map((column) => (
                    <Column
                        key={ column.id }
                        data={ column }
                        tableId={ table.id }
                        onRemoveColumn={ removeColumn }
                        onEditColumn={ editColumn }
                    />
                ))}

                { table.softDelete &&
                    <li className='clearfix'>
                        <div className='pull-left'>softDelete</div>
                    </li>
                }

                { table.timeStamp &&
                    <li className='clearfix'>
                        <div className='pull-left'>timeStamps</div>
                    </li>
                }
            </ul>
        );
    }
}

type Props = {
    columns: Array<ColumnType>,
    table: TableType,
    removeColumn: (data: ColumnType, tabledId: string) => void,
    editColumn: (data: ColumnType, tabledId: string) => void
};

export default Columns;
