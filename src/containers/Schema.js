import { connect } from 'react-redux';
import Schema from '../components/Schema';
import { saveDbName, toggleTableModal } from '../actions';

const mapStateToProps = (state) => ({
    dbName: state.database.name
});

const mapDispatchToProps = (dispatch) => ({
    saveDbName: (name) => {
        dispatch(saveDbName(name));
        dispatch(toggleTableModal());
    },
    toggleTableModal: () => {
        dispatch(toggleTableModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Schema);
