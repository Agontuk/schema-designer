/**
 * @flow
 */
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ExportDatabase from '../components/ExportDatabase';

// Avoid computing derived data when there is no relevant state change
const exportData = createSelector(
    (state) => state.database,
    (state) => state.tables,
    (state) => state.columns,
    (database, tables, columns) => ({
        database,
        tables,
        columns
    })
);

const mapStateToProps = (state) => ({
    data: exportData(state)
});

export default connect(mapStateToProps)(ExportDatabase);
