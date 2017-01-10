import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import Columns from '../components/Columns';
import { removeColumn } from '../actions';

const mapStateToProps = (state, ownProps) => {
    const columns = state.columns.get(ownProps.tableId);
    return {
        columns: columns ? columns : fromJS({})
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeColumn: (columnId, tableId) => {
            dispatch(removeColumn(columnId, tableId));
        }
        // editColumn: (data) => {
        //     dispatch(enableColumnEdit(data));
        //     dispatch(toggleColumnModal());
        // },
        // toggleColumnModal: (tableId) => {
        //     dispatch(toggleColumnModal(tableId));
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Columns);
