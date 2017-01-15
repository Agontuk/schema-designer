import React, { Component, PropTypes } from 'react';

class ForeignKeyForm extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     const { editData } = props;
    //     const tableId = editData.getIn(['foreignKey', 'on', 'id']) || '';
    //     const tableName = editData.getIn(['foreignKey', 'on', 'name']) || '';
    //     const columnId = editData.getIn(['foreignKey', 'references', 'id']) || '';
    //     const columnName = editData.getIn(['foreignKey', 'references', 'name']) || '';
    //
    //     this.setState({
    //         currentForeignTableId: tableId,
    //         currentForeignTableName: tableName,
    //         currentForeignColumnId: columnId,
    //         currentForeignColumnName: columnName
    //     });
    // }

    state = {
        currentForeignTableId: '',
        currentForeignTableName: '',
        currentForeignColumnId: '',
        currentForeignColumnName: ''
    }

    getData = () => {
        const {
            currentForeignColumnId,
            currentForeignColumnName,
            currentForeignTableId,
            currentForeignTableName
        } = this.state;

        if (!currentForeignTableId || !currentForeignColumnId) {
            return false;
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
            name = tables.filter((table) => table.id === selected)[0].name;
        }

        this.setState({
            currentForeignTableId: selected,
            currentForeignTableName: name,
            currentForeignColumnId: '',
            currentForeignColumnName: ''
        });
    }

    setCurrentForeignColumn = (event) => {
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
        const { tables, tableId, editData, columns } = this.props;
        const { currentForeignTableId } = this.state;

        return (
            <div className='form-group'>
                <strong className='col-xs-3 control-label'>Foreign Key:</strong>
                <span className='col-xs-2 control-label'>References:</span>
                <div className='col-xs-3'>
                    <select
                        className='form-control'
                        defaultValue={ editData.references.id }
                        onChange={ this.setCurrentForeignColumn }
                    >
                        <option value=''>None</option>

                        { columns[currentForeignTableId] === undefined ? null :
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
                        defaultValue={ editData.on.id }
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

ForeignKeyForm.propTypes = {
    tableId: PropTypes.string.isRequired,
    tables: PropTypes.arrayOf(React.PropTypes.object).isRequired,
    columns: PropTypes.objectOf(React.PropTypes.array).isRequired,
    editData: PropTypes.object.isRequired
};

export default ForeignKeyForm;
