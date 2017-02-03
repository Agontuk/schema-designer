/**
 * @flow
 */
import { connect } from 'react-redux';
import ColumnModal from '../../components/Modals/ColumnModal';
import {
    saveColumn,
    toggleColumnModal,
    updateColumn,
    saveForeignKeyRelation,
    updateForeignKeyRelation
} from '../../actions/ActionCreators';

const mapStateToProps = (state) => ({
    showColumnModal: state.ui.column.showModal,
    editMode: state.ui.column.edit,
    editData: state.ui.column.editData,
    tableId: state.ui.column.tableId,
    tables: state.tables,
    columns: state.columns
});

const mapDispatchToProps = (dispatch) => ({
    toggleColumnModal: () => {
        dispatch(toggleColumnModal());
    },
    saveColumn: (data, tableId, hideModal = true) => {
        dispatch(saveColumn(data, tableId));
        dispatch(saveForeignKeyRelation(data, tableId));

        if (hideModal) {
            dispatch(toggleColumnModal());
        }
    },
    updateColumn: (data, tableId) => {
        dispatch(updateColumn(data, tableId));
        dispatch(updateForeignKeyRelation(data, tableId));
        dispatch(toggleColumnModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnModal);
