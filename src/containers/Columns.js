import { connect } from 'react-redux';
import Columns from '../components/Columns';
import { removeColumn, enableColumnEdit, toggleColumnModal } from '../actions';

const mapStateToProps = (state, ownProps) => {
    const columns = state.columns[ownProps.tableId];
    return {
        columns: columns || []
    };
};

const mapDispatchToProps = (dispatch) => ({
    removeColumn: (columnData, tableId) => {
        dispatch(removeColumn(columnData, tableId));
    },
    editColumn: (data, tableId) => {
        dispatch(enableColumnEdit(data, tableId));
        dispatch(toggleColumnModal(tableId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Columns);
