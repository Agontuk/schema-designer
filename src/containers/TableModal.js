import { connect } from 'react-redux';
import TableModal from 'components/TableModal';
import { saveTable, toggleTableModal } from 'actions';

const mapStateToProps = (state) => {
    return {
        showTableModal: state.ui.getIn(['table', 'showModal'])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleTableModal: () =>  {
            dispatch(toggleTableModal());
        },
        saveTable: (data) => {
            dispatch(saveTable(data));
            dispatch(toggleTableModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableModal);
