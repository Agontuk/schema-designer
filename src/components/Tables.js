import React, { Component, PropTypes } from 'react';
import jsPlumb from 'jsplumb';
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

        jsPlumb.ready(() => {
            jsPlumb.draggable(document.querySelectorAll('.draggable:not(.jtk-draggable)'), {
                // containment: 'parent',
                drag: (event) => {
                    if (event.pos[0] < 0 || event.pos[1] < 0) {
                        const table = document.getElementById(event.el.id);

                        if (event.pos[0] < 0) {
                            table.style.left = 0;
                        }

                        if (event.pos[1] < 0) {
                            table.style.top = 0;
                        }
                    }

                    // Repaint all the connections
                    jsPlumb.repaintEverything();
                },
                stop: (event) => {
                    const newPos = {
                        id: event.el.id,
                        x: event.finalPos[0],
                        y: event.finalPos[1]
                    };

                    storeTablePosition(newPos);

                    // Make the current table's z-index larger than the others
                    const tables = document.querySelectorAll('.db-table');

                    for (let i = 0; i < tables.length; i += 1) {
                        tables[i].style.zIndex = 100;

                        if (tables[i].id === event.el.id) {
                            tables[i].style.zIndex = 150;
                        }
                    }
                }
            });
        });
    }

    render() {
        const { tables, removeTable, editTable, toggleColumnModal } = this.props;
        // 80 is the height of site header
        const height = document.documentElement.clientHeight - 80;

        if (tables.length === 0) {
            return null;
        }

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
    tables: PropTypes.arrayOf(PropTypes.object).isRequired,
    removeTable: PropTypes.func.isRequired,
    editTable: PropTypes.func.isRequired,
    toggleColumnModal: PropTypes.func.isRequired,
    storeTablePosition: PropTypes.func.isRequired
};

export default Tables;
