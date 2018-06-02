/**
 * @flow
 */
import React, { Component } from 'react';
import jsPlumb from 'jsplumb';
import Table from '../containers/Table';
import type { TableType, TablePositionType } from '../utils/flowtypes';

type Props = {
    tables: Array<TableType>,
    editTable: (data: TableType) => void,
    removeTable: (id: string) => void,
    storeTablePosition: (data: TablePositionType) => void,
    toggleColumnModal: (id: string) => void
};

class Tables extends Component<Props> {
    componentDidMount() {
        // Needed for initial render from localStorage
        this.makeTablesDraggable();
    }

    componentDidUpdate(prevProps: Props) {
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

                        if (table === null) {
                            return;
                        }

                        if (event.pos[0] < 0) {
                            table.style.left = '0px';
                        }

                        if (event.pos[1] < 0) {
                            table.style.top = '0px';
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
                        tables[i].style.zIndex = '100';

                        if (tables[i].id === event.el.id) {
                            tables[i].style.zIndex = '150';
                        }
                    }
                }
            });
        });
    }

    render() {
        console.log('Tables rendering'); // eslint-disable-line no-console
        const { tables, removeTable, editTable, toggleColumnModal } = this.props;

        if (tables.length === 0) {
            return null;
        }

        return (
            <div className='table-wrapper'>
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

export default Tables;
