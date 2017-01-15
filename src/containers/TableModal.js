import { connect } from 'react-redux';
import TableModal from '../components/TableModal';
import { saveTable, toggleTableModal, updateTable } from '../actions';

const mapStateToProps = (state) => ({
    showTableModal: state.ui.table.showModal,
    editMode: state.ui.table.edit,
    editData: state.ui.table.editData
});

const mapDispatchToProps = (dispatch) => ({
    toggleTableModal: () => {
        dispatch(toggleTableModal());
    },
    saveTable: (data) => {
        dispatch(saveTable(data));
        dispatch(toggleTableModal());
    },
    updateTable: (data) => {
        dispatch(updateTable(data));
        dispatch(toggleTableModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TableModal);
