/**
 * @flow
 */
import { connect } from 'react-redux';
import Header from '../components/Header';
import { toggleDbModal, toggleTableModal } from '../actions/ActionCreators';

const mapStateToProps = (state) => ({
    dbName: state.database.name,
    dbModal: state.ui.database.showModal
});

const mapDispatchToProps = (dispatch) => ({
    toggleDbModal: (editMode = false) => {
        dispatch(toggleDbModal(editMode));
    },
    toggleTableModal: () => {
        dispatch(toggleTableModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
