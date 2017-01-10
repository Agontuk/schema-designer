import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import Columns from '../components/Columns';
// import { removeTable, enableTableEdit, toggleTableModal, toggleColumnModal } from '../actions';

const mapStateToProps = (state, ownProps) => {
    const columns = state.columns.get(ownProps.tableId);
    return {
        columns: columns ? columns : fromJS({})
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         removeTable: (id) => {
//             dispatch(removeTable(id));
//         },
//         editTable: (data) => {
//             dispatch(enableTableEdit(data));
//             dispatch(toggleTableModal());
//         },
//         toggleColumnModal: (tableId) => {
//             dispatch(toggleColumnModal(tableId));
//         }
//     };
// };

export default connect(mapStateToProps)(Columns);
