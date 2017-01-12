import React, { Component, PropTypes } from 'react';

class ForeignKeyForm extends Component {
    state = {
        currentForeignTableId: '',
        currentForeignTableName: '',
        currentForeignColumnId: '',
        currentForeignColumnName: ''
    }

    componentDidMount () {
        const { editData } = this.props;

        const tableId = editData.getIn(['foreignKey', 'on', 'id']) || '';
        const tableName = editData.getIn(['foreignKey', 'on', 'name']) || '';
        const columnId = editData.getIn(['foreignKey', 'references', 'id']) || '';
        const columnName = editData.getIn(['foreignKey', 'references', 'name']) || '';

        this.setState({
            currentForeignTableId: tableId,
            currentForeignTableName: tableName,
            currentForeignColumnId: columnId,
            currentForeignColumnName: columnName
        });
    }

    getData = () => {
        const {
            currentForeignColumnId,
            currentForeignColumnName,
            currentForeignTableId,
            currentForeignTableName
        } = this.state;

        if (!currentForeignTableId || !currentForeignColumnId) {
            return;
        }

        return {
            references: {
                id: currentForeignColumnId,
                name: currentForeignColumnName
            },
            on: {
                id: currentForeignTableId,
                name: currentForeignTableName
            }
        };
    }

    setCurrentForeignTable = (event) => {
        const { tables } = this.props;

        const selected = event.target.value;
        let name = '';

        if (selected) {
            name = tables.filter((table) => table.get('id') === selected).first().get('name');
        }

        this.setState({
            currentForeignTableId: selected,
            currentForeignTableName: name
        });
    }

    setCurrentForeignColumn = (event) => {
        const { columns } = this.props;
        const { currentForeignTableId } = this.state;

        const selected = event.target.value;
        let name = '';

        if (selected) {
            name = columns.get(currentForeignTableId)
                .filter((column) => column.get('id') === selected)
                .first().get('name');
        }

        this.setState({
            currentForeignColumnId: selected,
            currentForeignColumnName: name
        });
    }

    render () {
        const { tables, tableId, editData, columns } = this.props;
        const { currentForeignTableId } = this.state;

        return (
            <div className='form-group'>
                <label className='col-xs-3 control-label'>Foreign Key:</label>
                <span className='col-xs-2 control-label'>References:</span>
                <div className='col-xs-3'>
                    <select
                        className='form-control'
                        ref='type'
                        defaultValue={ editData.getIn(['foreignKey', 'references', 'id']) }
                        onChange={ this.setCurrentForeignColumn }
                    >
                        <option value=''>None</option>

                        { columns.get(currentForeignTableId) === undefined ? null :
                            columns.get(currentForeignTableId).valueSeq().map((column) => {
                                return (
                                    <option key={ column.get('id') } value={ column.get('id') }>
                                        { column.get('name') }
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>
                <span className='col-xs-1 control-label'>On:</span>
                <div className='col-xs-3'>
                    <select
                        className='form-control'
                        ref='type'
                        defaultValue={ editData.getIn(['foreignKey', 'on', 'id']) }
                        onChange={ this.setCurrentForeignTable }
                    >
                        <option value=''>None</option>
                        { tables.filter((table) => {
                            // Don't include the current table
                            return table.get('id') !== tableId;
                        }).map((table) => {
                            return (
                                <option key={ table.get('id') } value={ table.get('id') }>
                                    { table.get('name') }
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        );
    }
}

ForeignKeyForm.propTypes = {
    tableId: PropTypes.string.isRequired,
    tables: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    editData: PropTypes.object.isRequired
};

export default ForeignKeyForm;
