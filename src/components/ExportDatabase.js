import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const ExportDatabase = ({ tables, columns }) => (
    <form className='form-inline' method='POST' action=''>
        <input type='hidden' name='tables' value={ JSON.stringify(tables) } />
        <input type='hidden' name='columns' value={ JSON.stringify(columns) } />
        <button type='submit' className='btn btn-default glyphicon glyphicon-download-alt'> Export</button>
    </form>
);

ExportDatabase.propTypes = {
    tables: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.objectOf(PropTypes.array).isRequired
};

const mapStateToProps = (state) => ({
    tables: state.tables,
    columns: state.columns
});

export default connect(mapStateToProps)(ExportDatabase);
