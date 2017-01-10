import { connect } from 'react-redux';
import ColumnModal from 'components/ColumnModal';
import { saveColumn, toggleColumnModal, updateColumn } from 'actions';

const mapStateToProps = (state) => {
    return {
        showColumnModal: state.ui.getIn(['column', 'showModal']),
        editMode: state.ui.getIn(['column', 'edit']),
        editData: state.ui.getIn(['column', 'editData'])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleColumnModal: () =>  {
            dispatch(toggleColumnModal());
        },
        saveColumn: (data) => {
            dispatch(saveColumn(data));
            dispatch(toggleColumnModal());
        },
        updateColumn: (data) => {
            dispatch(updateColumn(data));
            dispatch(toggleColumnModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnModal);
