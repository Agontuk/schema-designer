/**
 * @flow
 */
import { connect } from 'react-redux';
import Columns from '../components/Columns';
import { removeColumn, enableColumnEdit, toggleColumnModal } from '../actions/ActionCreators';

const mapStateToProps = (state, ownProps) => ({
    columns: state.columns[ownProps.table.id]
});

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
