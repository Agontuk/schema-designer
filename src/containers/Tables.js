import { connect } from 'react-redux';
import Tables from '../components/Tables';
import { removeTable, enableTableEdit, toggleTableModal, toggleColumnModal } from '../actions';

const mapStateToProps = (state) => ({
    tables: state.tables
});

const mapDispatchToProps = (dispatch) => ({
    removeTable: (id) => {
        dispatch(removeTable(id));
    },
    editTable: (data) => {
        dispatch(enableTableEdit(data));
        dispatch(toggleTableModal());
    },
    toggleColumnModal: (tableId) => {
        dispatch(toggleColumnModal(tableId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
