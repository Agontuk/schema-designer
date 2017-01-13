import { connect } from 'react-redux';
import ColumnModal from 'components/ColumnModal';
import {
    saveColumn,
    toggleColumnModal,
    updateColumn,
    saveForeignKeyRelation,
    updateForeignKeyRelation
} from 'actions';

const mapStateToProps = (state) => {
    return {
        showColumnModal: state.ui.getIn(['column', 'showModal']),
        editMode: state.ui.getIn(['column', 'edit']),
        editData: state.ui.getIn(['column', 'editData']),
        tableId: state.ui.getIn(['column', 'tableId']),
        tables: state.tables,
        columns: state.columns
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleColumnModal: () =>  {
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnModal);
