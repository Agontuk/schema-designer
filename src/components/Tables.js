import React, { Component, PropTypes } from 'react';
import Table from './Table';

class Tables extends Component {
    componentDidMount() {
        // Needed for initial render from localStorage
        window.jsPlumb.ready(() => {
            window.jsPlumb.draggable(document.querySelectorAll('.draggable:not(.jtk-draggable)'));
        });
    }

    componentDidUpdate(prevProps) {
        const { tables, storeTablePosition } = this.props;

        if (tables.length !== prevProps.tables.length) {
            // New tables available, make all tables draggable
            window.jsPlumb.ready(() => {
                window.jsPlumb.draggable(document.querySelectorAll('.draggable:not(.jtk-draggable)'), {
                    stop: (event) => {
                        const newPos = {
                            id: event.el.id,
                            x: event.finalPos[0],
                            y: event.finalPos[1]
                        };

                        storeTablePosition(newPos);
                    }
                });
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
    toggleColumnModal: PropTypes.func.isRequired,
    storeTablePosition: PropTypes.func.isRequired
};

export default Tables;
