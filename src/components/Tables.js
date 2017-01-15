import React, { Component, PropTypes } from 'react';
import Table from './Table';

class Tables extends Component {
    componentDidUpdate(prevProps) {
        const { tables } = this.props;

        if (tables.length !== prevProps.tables.length) {
            // New tables available, make all tables draggable
            window.jsPlumb.ready(() => {
                window.jsPlumb.draggable(document.querySelectorAll('.draggable:not(.jtk-draggable)'));
            });
        }
    }

    render() {
        const { tables, removeTable, editTable, toggleColumnModal } = this.props;

        return (
            <div>
                { tables.map((table) => (
                    <Table
                        key={ table.id }
                        data={ table }
                        onRemoveTable={ removeTable }
                        onEditTable={ editTable }
                        onToggleColumnModal={ toggleColumnModal }
                    />
                ))}
            </div>
        );
    }
}

Tables.propTypes = {
    tables: PropTypes.arrayOf(React.PropTypes.object).isRequired,
    removeTable: PropTypes.func.isRequired,
    editTable: PropTypes.func.isRequired,
    toggleColumnModal: PropTypes.func.isRequired
};

export default Tables;
