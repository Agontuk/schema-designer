import React, { Component, PropTypes } from 'react';
import Table from './Table';

class Tables extends Component {
    render () {
        const { tables, removeTable, editTable } = this.props;

        return (
            <div>
                { tables.map((table) => {
                    return (
                        <Table
                            key={ table.get('id') }
                            data={ table }
                            onRemoveTable={ removeTable }
                            onEditTable={ editTable }
                        />
                    );
                })}
            </div>
        );
    }
}

Tables.propTypes = {
    tables: PropTypes.object.isRequired,
    removeTable: PropTypes.func.isRequired,
    editTable: PropTypes.func.isRequired
};

export default Tables;
