import React, { Component, PropTypes } from 'react';
import Column from './Column';

class Columns extends Component {
    render() {
        const { columns, tableId, removeColumn, editColumn } = this.props;

        if (columns.length === 0) {
            return null;
        }

        return (
            <ul className='db-columns'>
                { columns.map((column) => (
                    <Column
                        key={ column.id }
                        data={ column }
                        tableId={ tableId }
                        onRemoveColumn={ removeColumn }
                        onEditColumn={ editColumn }
                    />
                ))}
            </ul>
        );
    }
}

Columns.propTypes = {
    columns: PropTypes.arrayOf(React.PropTypes.object).isRequired,
    tableId: PropTypes.string.isRequired,
    removeColumn: PropTypes.func.isRequired,
    editColumn: PropTypes.func.isRequired
};

export default Columns;
