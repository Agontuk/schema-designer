import React, { Component, PropTypes } from 'react';
import Table from './Table';

class Tables extends Component {
    componentDidMount() {
        // Needed for initial render from localStorage
        this.makeTablesDraggable();
    }

    componentDidUpdate(prevProps) {
        const { tables } = this.props;

        if (tables.length !== prevProps.tables.length) {
            // New tables available, make all tables draggable
            this.makeTablesDraggable();
        }
    }

    makeTablesDraggable = () => {
        const { storeTablePosition } = this.props;

        window.jsPlumb.ready(() => {
            window.jsPlumb.draggable(document.querySelectorAll('.draggable:not(.jtk-draggable)'), {
                containment: 'parent',
                drag: () => {
                    // Repaint all the connections
                    window.jsPlumb.repaintEverything();
                },
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

    render() {
        const { tables, removeTable, editTable, toggleColumnModal } = this.props;
        // 80 is the height of site header
        const height = document.documentElement.clientHeight - 80;

        return (
            <div
                className='table-wrapper'
                style={ { height, maxHeight: height } }
            >
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
