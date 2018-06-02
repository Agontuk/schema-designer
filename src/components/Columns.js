/**
 * @flow
 */
import React, { PureComponent } from 'react';
import Column from './Column';
import type { TableType, ColumnType } from '../utils/flowtypes';

type Props = {
    columns: Array<ColumnType>,
    table: TableType,
    removeColumn: (data: ColumnType, tabledId: string) => void,
    editColumn: (data: ColumnType, tabledId: string) => void
};

class Columns extends PureComponent<Props> {
    render() {
        console.log('Columns rendering'); // eslint-disable-line no-console
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

export default Columns;
