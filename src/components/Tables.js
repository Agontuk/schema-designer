import React, { Component, PropTypes } from 'react';
import jsPlumb from 'jsPlumb';
import Table from './Table';

class Tables extends Component {
    componentDidUpdate (prevProps) {
        const { tables } = this.props;

        if (tables.size !== prevProps.tables.size) {
            // New tables available, make all tables draggable
            jsPlumb.ready(() => {
                jsPlumb.draggable(document.querySelectorAll('.draggable:not(.jtk-draggable)'));
            });
        }
    }

    render () {
        const { tables, removeTable, editTable, toggleColumnModal } = this.props;

        return (
            <div>
                { tables.map((table) => {
                    return (
                        <Table
                            key={ table.get('id') }
                            data={ table }
                            onRemoveTable={ removeTable }
                            onEditTable={ editTable }
                            onToggleColumnModal={ toggleColumnModal }
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
    editTable: PropTypes.func.isRequired,
    toggleColumnModal: PropTypes.func.isRequired
};

export default Tables;
