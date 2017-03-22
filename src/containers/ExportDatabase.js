/**
 * @flow
 */
import { connect } from 'react-redux';
import ExportDatabase from '../components/ExportDatabase';

const mapStateToProps = (state) => ({
    data: state
});

export default connect(mapStateToProps)(ExportDatabase);
