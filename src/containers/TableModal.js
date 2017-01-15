import { connect } from 'react-redux';
import TableModal from '../components/TableModal';
import { saveTable, toggleTableModal, updateTable } from '../actions';

const mapStateToProps = (state) => ({
    showTableModal: state.ui.getIn(['table', 'showModal']),
    editMode: state.ui.getIn(['table', 'edit']),
    editData: state.ui.getIn(['table', 'editData'])
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
