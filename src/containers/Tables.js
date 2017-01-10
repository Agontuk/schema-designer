import { connect } from 'react-redux';
import Tables from '../components/Tables';
import { removeTable } from '../actions';

const mapStateToProps = (state) => {
    return {
        tables: state.tables
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeTable: (id) => {
            dispatch(removeTable(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
