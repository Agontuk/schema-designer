/**
 * @flow
 */
import { connect } from 'react-redux';
import TableModal from '../../components/Modals/TableModal';
import { saveTable, toggleTableModal, updateTable } from '../../actions/ActionCreators';

const mapStateToProps = (state) => ({
    showTableModal: state.ui.table.showModal,
    editMode: state.ui.table.edit,
    editData: state.ui.table.editData,
    tables: state.tables
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TableModal);
