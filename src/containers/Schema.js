import { connect } from 'react-redux';
import Schema from 'components/Schema';
import { saveDbName } from 'actions';

const mapStateToProps = (state) => {
    return {
        dbName: state.database.get('name')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveDbName: (name) => {
            dispatch(saveDbName(name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schema);
