/**
 * @flow
 */
import React, { Component } from 'react';
import type { ColumnType, ForeignKeyType, TableType } from '../utils/flowtypes';

class ForeignKeyForm extends Component {
    constructor(props: Props) {
        super(props);

        const { data } = props;
        const tableId = data.on.id;
        const tableName = data.on.name;
        const columnId = data.references.id;
        const columnName = data.references.name;

        this.state = {
            currentForeignTableId: tableId,
            currentForeignTableName: tableName,
            currentForeignColumnId: columnId,
            currentForeignColumnName: columnName
        };
    }

    props: Props

    state: State

    getData = () => {
        const {
            currentForeignColumnId,
            currentForeignColumnName,
            currentForeignTableId,
            currentForeignTableName
        } = this.state;

        let invalidData = false;

        if (!currentForeignTableId || !currentForeignColumnId) {
            invalidData = true;
        }

        return {
            references: {
                id: invalidData ? '' : currentForeignColumnId,
                name: invalidData ? '' : currentForeignColumnName
            },
            on: {
                id: invalidData ? '' : currentForeignTableId,
                name: invalidData ? '' : currentForeignTableName
            }
        };
    }

    setCurrentForeignTable = (event: { target: { value: string } }) => {
        const { tables } = this.props;

        const selected = event.target.value;
        let name = '';

        if (selected) {
            name = tables.filter((table) => table.id === selected)[0].name;
        }

        this.setState({
            currentForeignTableId: selected,
            currentForeignTableName: name,
            currentForeignColumnId: '',
            currentForeignColumnName: ''
        });
    }

    setCurrentForeignColumn = (event: { target: { value: string } }) => {
        const { columns } = this.props;
        const { currentForeignTableId } = this.state;

        const selected = event.target.value;
        let name = '';

        if (selected) {
            name = columns[currentForeignTableId]
                .filter((column) => column.id === selected)[0].name;
        }

        this.setState({
            currentForeignColumnId: selected,
            currentForeignColumnName: name
        });
    }

    render() {
        const { tables, tableId, data, columns } = this.props;
        const { currentForeignTableId } = this.state;

        return (
            <div className='form-group'>
                <strong className='col-xs-3 control-label'>Foreign Key:</strong>
                <span className='col-xs-2 control-label'>References:</span>
                <div className='col-xs-3'>
                    <select
                        className='form-control'
                        defaultValue={ data.references.id }
                        onChange={ this.setCurrentForeignColumn }
                    >
                        <option value=''>None</option>

                        { columns[currentForeignTableId] !== undefined &&
                            columns[currentForeignTableId].map((column) => (
                                <option key={ column.id } value={ column.id }>
                                    { column.name }
                                </option>
                            ))
                        }
                    </select>
                </div>
                <span className='col-xs-1 control-label'>On:</span>
                <div className='col-xs-3'>
                    <select
                        className='form-control'
                        defaultValue={ data.on.id }
                        onChange={ this.setCurrentForeignTable }
                    >
                        <option value=''>None</option>
                        { tables.filter((table) => (table.id !== tableId))
                            .map((table) => (
                                <option key={ table.id } value={ table.id }>
                                    { table.name }
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        );
    }
}

type Props = {
    tableId: string,
    tables: Array<TableType>,
    columns: {
        [tableId: string]: Array<ColumnType>
    },
    data: ForeignKeyType
};

type State = {
    currentForeignTableId: string,
    currentForeignTableName: string,
    currentForeignColumnId: string,
    currentForeignColumnName: string
};

export default ForeignKeyForm;
