import { connect } from 'react-redux';
import Table from '../components/Table';

const mapStateToProps = (state, ownProps) => ({
    position: state.ui.positions[ownProps.data.id]
});

export default connect(mapStateToProps)(Table);
