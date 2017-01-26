import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const ExportDatabase = ({ data }) => (
    <form className='form-inline' method='POST' action=''>
        <input type='hidden' name='schema' value={ JSON.stringify(data) } />
        <button type='submit' className='btn btn-default glyphicon glyphicon-download-alt'> Export</button>
    </form>
);

ExportDatabase.propTypes = {
    data: PropTypes.shape({
        database: PropTypes.object.isRequired,
        ui: PropTypes.object.isRequired,
        tables: PropTypes.arrayOf(PropTypes.object).isRequired,
        columns: PropTypes.objectOf(PropTypes.array).isRequired,
        relations: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired
};

const mapStateToProps = (state) => ({
    data: state
});

export default connect(mapStateToProps)(ExportDatabase);
