import React, { Component, PropTypes } from 'react';
import Column from './Column';

class Columns extends Component {
    render () {
        const { columns, tableId, removeColumn } = this.props;

        if (columns.size === 0) {
            return null;
        }

        return (
            <ul className='db-columns'>
                { columns.valueSeq().map((column) => {
                    return (
                        <Column
                            key={ column.get('id') }
                            data={ column }
                            tableId={ tableId }
                            onRemoveColumn={ removeColumn }
                        />
                    );
                })}
            </ul>
        );
    }
}

Columns.propTypes = {
    columns: PropTypes.object.isRequired,
    tableId: PropTypes.string.isRequired,
    removeColumn: PropTypes.func.isRequired
};

export default Columns;
