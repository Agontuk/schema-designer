/**
 * @flow
 */
import React, { Component } from 'react';
import type { ColumnType } from '../utils/flowtypes';

class Column extends Component {
    props: Props

    editColumn = () => {
        const { data, onEditColumn, tableId } = this.props;
        onEditColumn(data, tableId);
    }

    removeColumn = () => {
        const { data, onRemoveColumn, tableId } = this.props;
        onRemoveColumn(data, tableId);
    }

    render() {
        const { data } = this.props;

        return (
            <li className='clearfix' id={ data.id }>
                <div className='pull-left' title={ `${ data.name } (${ data.type })` }>
                    <span>{ data.name }</span>
                    { !!data.foreignKey.references.id && <sup>FK</sup> }
                    <small>({ data.type })</small>
                </div>
                <div className='pull-right'>
                    <span className='glyphicon glyphicon-pencil' onClick={ this.editColumn }></span>
                    <span className='glyphicon glyphicon-remove' onClick={ this.removeColumn }></span>
                </div>
            </li>
        );
    }
}

type Props = {
    data: ColumnType,
    tableId: string,
    onRemoveColumn: (data: ColumnType, tabledId: string) => void,
    onEditColumn: (data: ColumnType, tabledId: string) => void
};

export default Column;
