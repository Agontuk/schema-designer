import reducer from '../relationReducer';
import {
    removeColumn,
    removeTable,
    saveForeignKeyRelation,
    updateForeignKeyRelation
} from '../../actions/ActionCreators';

describe('relation reducer', () => {
    const state = [
        {
            source: { columnId: 'col22', tableId: 'table2' },
            target: { columnId: 'col11', tableId: 'table1' }
        },
        {
            source: { columnId: 'col32', tableId: 'table3' },
            target: { columnId: 'col11', tableId: 'table1' }
        }
    ];

    it('should remove all relations associated with the current table', () => {
        expect(reducer(state, removeTable('table2'))).toEqual([
            {
                source: { columnId: 'col32', tableId: 'table3' },
                target: { columnId: 'col11', tableId: 'table1' }
            }
        ]);
    });

    it('should remove all relations associated with the current column', () => {
        const columnData = { id: 'col11' };
        expect(reducer(state, removeColumn(columnData, 'table1'))).toEqual([]);
    });

    it('should save a new relation for the current column', () => {
        const columnData = {
            test1: {
                id: 'col42',
                foreignKey: {
                    references: { id: 'col11' },
                    on: { id: 'table1' }
                }
            },
            test2: {
                id: 'col42',
                foreignKey: {
                    references: { id: '' },
                    on: { id: '' }
                }
            }
        };

        expect(reducer(state, saveForeignKeyRelation(columnData.test1, 'table4')))
            .toEqual([
                {
                    source: { columnId: 'col22', tableId: 'table2' },
                    target: { columnId: 'col11', tableId: 'table1' }
                },
                {
                    source: { columnId: 'col32', tableId: 'table3' },
                    target: { columnId: 'col11', tableId: 'table1' }
                },
                {
                    source: { columnId: 'col42', tableId: 'table4' },
                    target: { columnId: 'col11', tableId: 'table1' }
                }
            ]);

        expect(reducer(state, saveForeignKeyRelation(columnData.test2, 'table4'))).toEqual(state);
    });

    it('should update any foreign key relation that uses the current column', () => {
        const columnData = {
            test1: {
                id: 'col22',
                foreignKey: {
                    references: { id: '' },
                    on: { id: '' }
                }
            },
            test2: {
                id: 'col32',
                foreignKey: {
                    references: { id: 'col21' },
                    on: { id: 'table2' }
                }
            },
            test3: {
                id: 'col42',
                foreignKey: {
                    references: { id: 'col31' },
                    on: { id: 'table3' }
                }
            }
        };

        // Should remove the relation
        expect(reducer(state, updateForeignKeyRelation(columnData.test1, 'table2')))
            .toEqual([
                {
                    source: { columnId: 'col32', tableId: 'table3' },
                    target: { columnId: 'col11', tableId: 'table1' }
                }
            ]);

        // Should update the existing foreign key relation with new data
        expect(reducer(state, updateForeignKeyRelation(columnData.test2, 'table3')))
            .toEqual([
                {
                    source: { columnId: 'col22', tableId: 'table2' },
                    target: { columnId: 'col11', tableId: 'table1' }
                },
                {
                    source: { columnId: 'col32', tableId: 'table3' },
                    target: { columnId: 'col21', tableId: 'table2' }
                }
            ]);

        // Should add new relation for the given data
        expect(reducer(state, updateForeignKeyRelation(columnData.test3, 'table4')))
            .toEqual([
                {
                    source: { columnId: 'col22', tableId: 'table2' },
                    target: { columnId: 'col11', tableId: 'table1' }
                },
                {
                    source: { columnId: 'col32', tableId: 'table3' },
                    target: { columnId: 'col11', tableId: 'table1' }
                },
                {
                    source: { columnId: 'col42', tableId: 'table4' },
                    target: { columnId: 'col31', tableId: 'table3' }
                }
            ]);
    });
});
