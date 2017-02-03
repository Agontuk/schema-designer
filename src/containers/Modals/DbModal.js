/**
 * @flow
 */
import { connect } from 'react-redux';
import DbModal from '../../components/Modals/DbModal';
import { saveDbName, toggleTableModal, toggleDbModal } from '../../actions/ActionCreators';

const mapStateToProps = (state) => ({
    name: state.database.name,
    showModal: state.ui.database.showModal,
    editMode: state.ui.database.edit
});

const mapDispatchToProps = (dispatch) => ({
    saveDbName: (name, editMode) => {
        dispatch(saveDbName(name));
        dispatch(toggleDbModal());

        if (!editMode) {
            // First time, show table modal
            dispatch(toggleTableModal());
        }
    },
    toggleDbModal: () => {
        dispatch(toggleDbModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DbModal);
