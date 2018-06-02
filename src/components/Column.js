/**
 * @flow
 */
import noop from 'lodash/noop';
import React, { PureComponent } from 'react';
import type { ColumnType } from '../utils/flowtypes';

type Props = {
    data: ColumnType,
    tableId: string,
    onRemoveColumn: (data: ColumnType, tabledId: string) => void,
    onEditColumn: (data: ColumnType, tabledId: string) => void
};

class Column extends PureComponent<Props> {
    editColumn = () => {
        const { data, onEditColumn, tableId } = this.props;
        onEditColumn(data, tableId);
    }

    removeColumn = () => {
        const { data, onRemoveColumn, tableId } = this.props;
        onRemoveColumn(data, tableId);
    }

    render() {
        console.log('Column rendering'); // eslint-disable-line no-console
        const { data } = this.props;

        return (
            <li className='clearfix' id={ data.id }>
                <div className='pull-left' title={ data.comment ? data.comment : `${ data.name } (${ data.type })` }>
                    <span>{ data.name }</span>
                    { !!data.autoInc && <sup>PK</sup> }
                    { !!data.foreignKey.references.id && <sup>FK</sup> }
                    <small>({ data.type })</small>
                </div>
                <div className='pull-right'>
                    <span
                        className='fa fa-pencil'
                        onClick={ this.editColumn }
                        onKeyPress={ noop }
                    >
                    </span>
                    <span
                        className='fa fa-remove'
                        onClick={ this.removeColumn }
                        onKeyPress={ noop }
                    >
                    </span>
                </div>
            </li>
        );
    }
}

export default Column;
