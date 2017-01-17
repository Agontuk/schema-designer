import React, { Component, PropTypes } from 'react';
import Column from './Column';

class Columns extends Component {
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

                { table.softDelete ?
                    <li className='clearfix'>
                        <div className='pull-left'>softDelete</div>
                    </li> : null
                }

                { table.timeStamp ?
                    <li className='clearfix'>
                        <div className='pull-left'>timeStamps</div>
                    </li> : null
                }
            </ul>
        );
    }
}

Columns.propTypes = {
    columns: PropTypes.arrayOf(React.PropTypes.object).isRequired,
    table: PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        softDelete: React.PropTypes.bool.isRequired,
        timeStamp: React.PropTypes.bool.isRequired
    }).isRequired,
    removeColumn: PropTypes.func.isRequired,
    editColumn: PropTypes.func.isRequired
};

export default Columns;
